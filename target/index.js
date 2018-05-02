"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const db_1 = require("./db");
const controller_1 = require("./webhooks-url/controller");
const controller_2 = require("./forwarding/controller");
const port = process.env.PORT || 4008;
const app = routing_controllers_1.createKoaServer({
    controllers: [
        controller_1.default,
        controller_2.default
    ]
});
db_1.default()
    .then(_ => {
    app.listen(port, () => console.log(`2 --> Listening on port ${port}`));
})
    .catch(err => console.error(err));
//# sourceMappingURL=index.js.map