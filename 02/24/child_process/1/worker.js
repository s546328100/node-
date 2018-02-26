process.on('message', function(mes) {
    console.log(`from master, message: ${mes}`);
});
process.send('this is worker');
