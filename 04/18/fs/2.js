const fs = require('fs');

function FileObject() {
    this.filename = '';

    this.file_exists = function(callback) {
        let self = this;

        console.log('about to open: ' + self.filename);
        fs.open(this.filename, 'r', function(err, handle) {
            if (err) {
                console.log("can't open: " + self.filename);
                callback(err);
                return;
            }
            fs.close(handle, () => {});
            callback(null, true);
        });
    };
}

let fo = new FileObject();
fo.filename = '13333';
fo.file_exists((err, result) => {
    if (err) {
        console.log('Aw, bunmer: ' + JSON.stringify(err));
        return;
    }
    console.log('file exists!!');
});