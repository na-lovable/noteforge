import { createAccessControl } from "better-auth/plugins/access";
import { adminAc, defaultStatements, memberAc, ownerAc } from "better-auth/plugins/organization/access";

const statement = {
    ...defaultStatements, 
    project: ["create", "share", "update", "delete"],
} as const;

const ac = createAccessControl(statement);

const member = ac.newRole({ 
    project: ["create"], 
}); 

const orgAdmin = ac.newRole({ 
    project: ["create", "update"],
    member: ['delete']
}); 

const owner = ac.newRole({ 
    project: ["create", "update", "delete"], 
    member: ["delete", "update"],
    organization: ["delete"],
    team: ["create", "delete", "update"],
});

export {statement, ac, member, orgAdmin, owner};