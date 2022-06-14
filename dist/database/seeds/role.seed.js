"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const role_entity_1 = require("../../roles/role.entity");
class CreateRole {
    async run(factory, connection) {
        const countRole = await connection
            .createQueryBuilder()
            .select()
            .from(role_entity_1.Role, 'roles')
            .getCount();
        if (countRole === 0) {
            await connection
                .createQueryBuilder()
                .insert()
                .into(role_entity_1.Role)
                .values([{ name: 'ADMIN' }, { name: 'RENTER' }, { name: 'OWNER' }])
                .execute();
        }
    }
}
exports.default = CreateRole;
//# sourceMappingURL=role.seed.js.map