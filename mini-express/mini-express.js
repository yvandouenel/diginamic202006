const http = require('http');

class MiniExpress {

    constructor() {
        this.middlewares = [];
    }

    listen(port, startCallback) {
        const server = http.createServer((req, res) => {
            this.useMiddleware(0, req, res);
        });
        server.listen(port, startCallback);
    }

    useMiddleware(index, req, res) {
        const next = () => {
            this.useMiddleware(index + 1, req, res);
        };
        const middleware = this.middlewares[index];
        if (middleware) {
            middleware(req, res, next);
        }
    }

    use(middleware) {
        this.middlewares.push(middleware);
    }

    route(method, path, callback) {
        this.use((req, res, next) => {
            if (req.method.toLowerCase() === method &&
                req.url === path) {
                callback(req, res);
            } else {
                next();
            }
        });
    }
    get(path, callback) {
        this.route('get', path, callback);
    }
    post(path, callback) {
        this.route('post', path, callback);
    }
}

function createMiniExpress() {
    return new MiniExpress();
}

module.exports = createMiniExpress;