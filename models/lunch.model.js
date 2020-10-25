const UserModel = require("./user.model")

class LunchModel extends UserModel {
  constructor(host, user, password, database) {
    super(host, user, password, database)
  }

  async findPartnerInternal(connection, session) {
    let queryFindPartner = "";

    const user = await this.getMyData(connection, session).catch(err => err);
    if (this.hasErrAt(user)) {
      return user;
    }

    // Case 1: Search for user from other department only
    if (user.prefOtherDep) {
      // Filter out all people not in department AND who do have a value of 0 at prefOtherDep
      queryFindPartner = `
      SELECT username, email, departmentName
      FROM USER_LOGIN 
      WHERE NOT ID='${user.id}'
      AND NOT departmentName='${user.departmentName}'
      AND prefOtherDep='0' 
      ORDER BY RAND() LIMIT 1;
      `;
      const partnerDataRes = await this.get(connection, queryFindPartner);
      if (this.hasErrAt(partnerDataRes)) {
        return partnerDataRes;
      }

      const partner = await partnerDataRes.results[0];
      return partner
    } 

    // Case 2: Search for user from the same department too
    else {
      // Filter out all people not in department AND who do have a value of 0 at prefOtherDep
      queryFindPartner = `
      SELECT username, email, departmentName
      FROM USER_LOGIN 
      WHERE NOT ID='${id}'
      ORDER BY RAND() LIMIT 1;
      `;
      const partnerDataRes = await this.get(connection, queryFindPartner);
      if (this.hasErrAt(partnerDataRes)) {
        return partnerDataRes;
      }

      const partner = await partnerDataRes.results[0];
      return partner
    }
  }
}

module.exports = LunchModel; 