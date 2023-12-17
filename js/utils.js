Array.prototype.parsed2D = function() {
    let rows = [];
    for(let i = 0; i < this.length; i += 16) {
        rows.push(this.slice(i, i + 16));
    }
    return rows
}
Array.prototype.creatFrom2D = function() {
    let objects = [];
    parsedCollisions.forEach((row, y) => {
        row.forEach((elm, x) => {
            if(elm === 292) {
                objects.push(new CollisionBlock({position: {
                    x: x * 64,
                    y: y * 64
                }}))
            }
        })
    })
    return objects;
}