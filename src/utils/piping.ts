interface Object {
    pipeOp<Self, Result>(this:Self, next:(value:Self) => Result):Result
}

Object.prototype.pipeOp = function<Self, Result>(this:Self, next:(value:Self) => Result):Result {
    return next(this)
}
