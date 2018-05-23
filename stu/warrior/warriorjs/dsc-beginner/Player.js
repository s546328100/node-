class Player {
    constructor() {
        this.isRetreat = true;
        this.retreat = 0;
        this.isBlood = false;
        this.direction = {
            1: 'backward',
            '-1': 'forward'
        };
        this.i = 1;

        this.advance = 0;
        this.isWhole = false;
    }
    playTurn(warrior) {
        let wall = this.isWall(warrior, this.direction[this.i]);
        if (wall === 0) {
            this.isWhole = true;
            this.i = -this.i;
        }

        let enemy = this.isEnemy(warrior, this.direction[this.i]);
        let captive = this.isCaptive(warrior, this.direction[this.i]);

        warrior.think('look captive：' + captive);
        warrior.think('look enemy：' + enemy[0] + ' ' + enemy[1] + ' ' + enemy[2]);

        if (captive + enemy[0] + enemy[1] + enemy[2] === -4 && this.isWhole) {
            if (this.isBlood) {
                warrior.rest();
                if (warrior.health() >= 16) this.isBlood = false;
            } else warrior.walk(this.direction[this.i]);
        } else {
            this.single(warrior, enemy, captive);
        }

        // if (enemy > -1) {
        //     warrior.shoot(this.direction[this.i], 2);
        // }

        // let space = this.isEnemyInSight(warrior);
    }

    isWall(warrior, direction) {
        let wall = warrior.look(direction).findIndex(space => space.isWall());
        return wall;
    }

    isEnemy(warrior, direction) {
        let res = {
            0: -1,
            1: -1,
            2: -1
        };
        let looks = warrior.look(direction);
        for (let i = 0; i < looks.length; i++) {
            let space = looks[i];
            let unit = space.getUnit();
            if (!space.isEmpty() && unit && unit.isEnemy()) {
                res[i] = i;
            }
        }
        return res;
    }

    isCaptive(warrior, direction) {
        const unit = warrior.look(direction).findIndex(space => !space.isEmpty() && space.getUnit() && space.getUnit().isBound());
        return unit;
    }

    single(warrior, enemy, captive) {
        let space = warrior.feel(this.direction[this.i]);
        let unit = space.getUnit();

        let enemys = 0;
        for (let key in enemy) {
            let e = enemy[key];
            if (e > 0) enemys++;
        }
        warrior.think('look enemys：' + enemys);

        warrior.think('退：' + this.retreat);

        if (space.isWall()) {
            this.retreat = 0;
            this.isWhole = true;

            this.i = -this.i;
            // warrior.walk(this.direction[this.i]);
        }

        if (space.isEmpty()) {
            this.isRetreat = true;
            if (space.isStairs()) {
                if (!this.isWhole) this.i = -this.i;
                warrior.walk(this.direction[this.i]);
            } else {
                // if (this.retreat > 1) {
                //     this.retreat = 0;
                //     warrior.walk(this.direction[-this.i]);
                // } else {
                //     if (this.isBlood > 1) {
                //         warrior.rest();
                //         if (warrior.health() >= 10) this.isBlood = 0;
                //     } else if ((enemys > 1 && captive === -1) || (warrior.health() <= 2 && (enemys > 0 || enemy[0] > 0))) {
                //         warrior.shoot(this.direction[this.i]);
                //     } else warrior.walk(this.direction[this.i]);
                // }
                if (this.isBlood) {
                    warrior.rest();
                    if (warrior.health() >= 16) this.isBlood = false;
                } else if ((enemys > 1 && captive === -1) || (warrior.health() <= 6 && (enemys > 0 || enemy[0] > 0))) {
                    if (warrior.health() <= 4) {
                        this.isBlood = true;
                        warrior.walk(this.direction[-this.i]);
                    } else warrior.shoot(this.direction[this.i]);
                } else warrior.walk(this.direction[this.i]);
            }
        } else if (!space.isWall()) {
            if (!unit.isEnemy() && unit.isBound()) {
                warrior.rescue(this.direction[this.i]);
            } else {
                // if (this.isRetreat) {
                //     this.retreat++;

                //     this.isRetreat = false;
                // }
                if (warrior.health() <= 6) {
                    // warrior.pivot(this.direction[-this.i]);
                    // this.retreat--;
                    if (warrior.health() <= 4) {
                        this.isBlood = true;
                    }
                    warrior.walk(this.direction[-this.i]);
                } else {
                    warrior.attack(this.direction[this.i]);
                }
            }
        }
    }

    old(warrior) {
        let space = warrior.feel(this.direction[this.i]);
        let unit = space.getUnit();

        warrior.think('退：' + this.retreat);

        if (space.isWall()) {
            this.retreat = 0;

            this.i = -this.i;
            // warrior.walk(this.direction[this.i]);
        }

        if (space.isEmpty()) {
            if (space.isStairs()) {
                warrior.walk(this.direction[this.i]);
            } else {
                if (this.retreat > 0) {
                    this.retreat--;
                    warrior.walk(this.direction[-this.i]);
                } else {
                    if (this.isBlood) {
                        warrior.rest();
                        if (warrior.health() >= 19) this.isBlood = false;
                    } else warrior.walk(this.direction[this.i]);
                }
            }
        } else if (!space.isWall()) {
            if (!unit.isEnemy() && unit.isBound()) {
                warrior.rescue(this.direction[this.i]);
            } else {
                this.retreat = 2;
                this.isBlood = true;
                if (warrior.health() <= 2) {
                    // warrior.pivot(this.direction[-this.i]);
                    this.retreat--;
                    warrior.walk(this.direction[-this.i]);
                } else {
                    warrior.attack(this.direction[this.i]);
                }
            }
        }
    }
}
