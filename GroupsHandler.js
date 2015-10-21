/**
 * Created by Rajinda on 9/30/2015.
 */


var messageFormatter = require('dvp-common/CommonMessageGenerator/ClientMessageJsonFormatter.js');
var logger = require('dvp-common/LogHandler/CommonLogHandler.js').logger;
var DbConn = require('dvp-dbmodels');
var moment = require('moment');
var Sequelize = require('sequelize');


function CreateGroups(groupName, groupClass, groupType, groupCategory, tenantId, companyId, otherData,percentage, callback) {
    DbConn.ResGroups
        .create(
        {
            GroupName: groupName,
            GroupClass: groupClass,
            GroupType: groupType,
            GroupCategory: groupCategory,
            TenantId: tenantId,
            CompanyId: companyId,
            OtherData: otherData,
            Percentage:percentage,
            Status: true
        }
    ).then(function (cmp) {
            var jsonString = messageFormatter.FormatMessage(undefined, "SUCCESS", true, cmp);
            logger.info('[DVP-ResGroups.CreateGroups] - [PGSQL] - inserted successfully. [%s] ', jsonString);
            callback.end(jsonString);
        }).error(function (err) {
            logger.error('[DVP-ResGroups.CreateGroups] - [%s] - [PGSQL] - insertion  failed-[%s]', groupName, err);
            var jsonString = messageFormatter.FormatMessage(err, "EXCEPTION", false, undefined);
            callback.end(jsonString);
        });
}

function EditGroups(groupId, groupName, groupClass, groupType, groupCategory, tenantId, companyId, otherData,percentage, callback) {
    DbConn.ResGroups
        .create(
        {
            GroupName: groupName,
            GroupClass: groupClass,
            GroupType: groupType,
            GroupCategory: groupCategory,
            TenantId: tenantId,
            CompanyId: companyId,
            OtherData: otherData,
            Percentage:percentage,
            Status: true
        },
        {where: [{GroupId: groupId}, {TenantId: tenantId}, {CompanyId: companyId}]}
    ).then(function (cmp) {
            var jsonString = messageFormatter.FormatMessage(undefined, "SUCCESS",  cmp==1, cmp);
            logger.info('[DVP-ResGroups.EditGroups] - [PGSQL] - inserted successfully. [%s] ', jsonString);
            callback.end(jsonString);
        }).error(function (err) {
            logger.error('[DVP-ResGroups.EditGroups] - [%s] - [PGSQL] - insertion  failed-[%s]', attribute, err);
            var jsonString = messageFormatter.FormatMessage(err, "EXCEPTION", false, undefined);
            callback.end(jsonString);
        });
}

function DeleteGroups(groupId, tenantId, companyId, callback) {
    DbConn.ResGroups
        .create(
        {
            Status: false
        },
        {where: [{GroupId: groupId}, {TenantId: tenantId}, {CompanyId: companyId}]}
    ).then(function (cmp) {
            var jsonString = messageFormatter.FormatMessage(undefined, "SUCCESS", cmp==1, cmp);
            logger.info('[DVP-ResGroups.DeleteGroups] - [PGSQL] - inserted successfully. [%s] ', jsonString);
            callback.end(jsonString);
        }).error(function (err) {
            logger.error('[DVP-ResGroups.DeleteGroups] - [%s] - [PGSQL] - insertion  failed-[%s]', attribute, err);
            var jsonString = messageFormatter.FormatMessage(err, "EXCEPTION", false, undefined);
            callback.end(jsonString);
        });
}

function GetAllGroups(tenantId, companyId, callback) {

    DbConn.ResGroups.findAll({where: [{Status: true}, {TenantId: tenantId}, {CompanyId: companyId}]}).then(function (CamObject) {
        if (CamObject) {
            logger.info('[DVP-ResGroups.GetAllGroups] - [%s] - [PGSQL]  - Data found  - %s-[%s]', tenantId, companyId, JSON.stringify(CamObject));
            var jsonString = messageFormatter.FormatMessage(undefined, "SUCCESS", true, CamObject);

            callback.end(jsonString);
        }
        else {
            logger.error('[DVP-ResGroups.GetAllGroups] - [PGSQL]  - No record found for %s - %s  ', tenantId, companyId);
            var jsonString = messageFormatter.FormatMessage(new Error('No record'), "EXCEPTION", false, undefined);
            callback.end(jsonString);
        }
    }).error(function (err) {
        logger.error('[DVP-ResGroups.GetAllGroups] - [%s] - [%s] - [PGSQL]  - Error in searching.-[%s]', tenantId, companyId, err);
        var jsonString = messageFormatter.FormatMessage(err, "EXCEPTION", false, undefined);
        callback.end(jsonString);
    });
}

function GetAllGroupsPaging(tenantId, companyId, rowCount, pageNo, callback) {

    DbConn.ResGroups.findAll({
        where: [{Status: true}, {TenantId: tenantId}, {CompanyId: companyId}], offset: ((pageNo - 1) * rowCount),
        limit: rowCount,
    }).then(function (CamObject) {
        if (CamObject) {
            logger.info('[DVP-ResGroups.GetAllGroupsPaging] - [%s] - [PGSQL]  - Data found  - %s-[%s]', tenantId, companyId, JSON.stringify(CamObject));
            var jsonString = messageFormatter.FormatMessage(undefined, "SUCCESS", true, CamObject);

            callback.end(jsonString);
        }
        else {
            logger.error('[DVP-ResGroups.GetAllGroupsPaging] - [PGSQL]  - No record found for %s - %s  ', tenantId, companyId);
            var jsonString = messageFormatter.FormatMessage(new Error('No record'), "EXCEPTION", false, undefined);
            callback.end(jsonString);
        }
    }).error(function (err) {
        logger.error('[DVP-ResGroups.GetAllGroupsPaging] - [%s] - [%s] - [PGSQL]  - Error in searching.-[%s]', tenantId, companyId, err);
        var jsonString = messageFormatter.FormatMessage(err, "EXCEPTION", false, undefined);
        callback.end(jsonString);
    });
}

function GetGroupByGroupId(groupId, tenantId, companyId, callback) {

    DbConn.ResGroups.find({where: [{Status: true}, {GroupId: groupId}, {TenantId: tenantId}, {CompanyId: companyId}]}).then(function (CamObject) {
        if (CamObject) {
            logger.info('[DVP-ResGroups.GetGroupByGroupId] - [%s] - [PGSQL]  - Data found  - %s-[%s]', tenantId, companyId, JSON.stringify(CamObject));
            var jsonString = messageFormatter.FormatMessage(undefined, "SUCCESS", true, CamObject);

            callback.end(jsonString);
        }
        else {
            logger.error('[DVP-ResGroups.GetGroupByGroupId] - [PGSQL]  - No record found for %s - %s  ', tenantId, companyId);
            var jsonString = messageFormatter.FormatMessage(new Error('No record'), "EXCEPTION", false, undefined);
            callback.end(jsonString);
        }
    }).error(function (err) {
        logger.error('[DVP-ResAttribute.GetGroupByGroupId] - [%s] - [%s] - [PGSQL]  - Error in searching.-[%s]', tenantId, companyId, err);
        var jsonString = messageFormatter.FormatMessage(err, "EXCEPTION", false, undefined);
        callback.end(jsonString);
    });
}

function DeleteAttributeFromGroup(groupId,attributeId ,tenantId, companyId, callback){
    DbConn.ResAttributeGroups
        .destroy(
        { where : [{AttributeId:attributeId},{GroupId:groupId},{TenantId:tenantId},{CompanyId:companyId}]
        }
    ).then(function (cmp) {
            var jsonString = messageFormatter.FormatMessage(undefined, "SUCCESS", cmp==1, cmp);
            logger.info('[DVP-ResGroups.DeleteAttributeFromGroup] - [PGSQL] - delete successfully. [%s] ', jsonString);
            callback.end(jsonString);
        }).error(function (err) {
            logger.error('[DVP-ResGroups.DeleteAttributeFromGroup] - [%s] - [PGSQL] - delete  failed-[%s]', groupId, err);
            var jsonString = messageFormatter.FormatMessage(err, "EXCEPTION", false, undefined);
            callback.end(jsonString);
        });
}

function AddAttributeToGroups(AttributeIds, groupName, groupClass, groupType, groupCategory, tenantId, companyId, otherData, callback) {
    DbConn.ResGroups
        .create(
        {
            GroupName: groupName,
            GroupClass: groupClass,
            GroupType: groupType,
            GroupCategory: groupCategory,
            TenantId: tenantId,
            CompanyId: companyId,
            OtherData: otherData,
            Status: true
        }
    ).then(function (cmp) {
            var jsonString = messageFormatter.FormatMessage(undefined, "SUCCESS", true, cmp);
            logger.info('[DVP-ResGroups.CreateGroups] - [PGSQL] - inserted successfully. [%s] ', jsonString);
            AddAttributeToExsistingGroups(AttributeIds, cmp.GroupId, tenantId, companyId, otherData, callback)

        }).error(function (err) {
            logger.error('[DVP-ResGroups.CreateGroups] - [%s] - [PGSQL] - insertion  failed-[%s]', groupName, err);
            var jsonString = messageFormatter.FormatMessage(err, "EXCEPTION", false, undefined);
            callback.end(jsonString);
        });
}

function AddAttributeToExsistingGroups(AttributeIds, groupId, tenantId, companyId, otherData, callback) {

    DbConn.ResGroups.find({where: [{Status: true}, {GroupId: groupId}, {TenantId: tenantId}, {CompanyId: companyId}]}).then(function (CamObject) {
        if (CamObject) {
            logger.info('[DVP-ResGroups.AddAttributeToExsistingGroups.GetGroupByGroupId] - [%s] - [PGSQL]  - Data found  - %s-[%s]', tenantId, companyId, JSON.stringify(CamObject));
            var startTime = new Date();
            var nos = [];
            for (var i = 0; i < AttributeIds.length; i++) {
                var no = {
                    AttributeId: AttributeIds[i],
                    GroupId: groupId,
                    TenantId: tenantId,
                    CompanyId: companyId,
                    OtherData: otherData,
                    Status: true
                };
                nos.push(no);
            }

            DbConn.ResAttributeGroups.bulkCreate(
                nos, {validate: true, individualHooks: true}
            ).then(function (results) {
                    var jsonString = messageFormatter.FormatMessage(undefined, "SUCCESS", true, results);
                    logger.info('[DVP-ResAttributeGroups.AddAttributeToGroup] - [PGSQL] - add attribute successfully.[%s] ', jsonString);
                    callback.end(jsonString);
                }).catch(function (err) {
                    var jsonString = messageFormatter.FormatMessage(err, "EXCEPTION", false, undefined);
                    logger.error('[DVP-ResAttributeGroups.AddAttributeToGroup] - [%s] - [PGSQL] - add attribute  failed', companyId, err);
                    callback.end(jsonString);
                }).finally(function () {
                    logger.info('UploadContacts - %s - %s ms Done.', AttributeIds.length, (new Date() - startTime));
                });
        }
        else {
            logger.error('[DVP-ResGroups.AddAttributeToExsistingGroups.GetGroupByGroupId] - [PGSQL]  - No record found for %s - %s  ', tenantId, companyId);
            var jsonString = messageFormatter.FormatMessage(new Error('Invalid Group ID'), "EXCEPTION", false, undefined);
            callback.end(jsonString);

        }
    }).error(function (err) {
        logger.error('[DVP-ResAttribute.AddAttributeToExsistingGroups.GetGroupByGroupId] - [%s] - [%s] - [PGSQL]  - Error in searching.-[%s]', tenantId, companyId, err);
        var jsonString = messageFormatter.FormatMessage(err, "EXCEPTION", false, undefined);
        callback.end(jsonString);

    });


}

function GetAttributeByGroupId(groupId, tenantId, companyId, callback) {
    DbConn.ResAttributeGroups.findAll({where: [{GroupId: groupId}, {Status: true}, {TenantId: tenantId}, {CompanyId: companyId}]}).then(function (CamObject) {
        if (CamObject) {
            logger.info('[DVP-ResAttributeGroups.GetAttributeByGroupId] - [%s] - [PGSQL]  - Data found  - %s-[%s]', tenantId, companyId, JSON.stringify(CamObject));
            var jsonString = messageFormatter.FormatMessage(undefined, "SUCCESS", true, CamObject);

            callback.end(jsonString);
        }
        else {
            logger.error('[DVP-ResAttributeGroups.GetAttributeByGroupId] - [PGSQL]  - No record found for %s - %s  ', tenantId, companyId);
            var jsonString = messageFormatter.FormatMessage(new Error('No record'), "EXCEPTION", false, undefined);
            callback.end(jsonString);
        }
    }).error(function (err) {
        logger.error('[DVP-ResAttributeGroups.GetAttributeByGroupId] - [%s] - [%s] - [PGSQL]  - Error in searching.-[%s]', tenantId, companyId, err);
        var jsonString = messageFormatter.FormatMessage(err, "EXCEPTION", false, undefined);
        callback.end(jsonString);
    });
}

function GetAttributeByGroupIdWithDetails(groupId, tenantId, companyId, callback) {
    DbConn.ResAttributeGroups.findAll({
        where: [{GroupId: groupId}, {Status: true}, {TenantId: tenantId}, {CompanyId: companyId}],
        include: [{ model: DbConn.ResGroups,  as: "ResGroups" },
            { model: DbConn.ResAttribute, as: "ResAttribute"   }
        ]
    }).then(function (CamObject) {
        if (CamObject) {
            logger.info('[DVP-ResAttributeGroups.GetAttributeByGroupIdWithDetails] - [%s] - [PGSQL]  - Data found  - %s-[%s]', tenantId, companyId, JSON.stringify(CamObject));
            var jsonString = messageFormatter.FormatMessage(undefined, "SUCCESS", true, CamObject);

            callback.end(jsonString);
        }
        else {
            logger.error('[DVP-ResAttributeGroups.GetAttributeByGroupIdWithDetails] - [PGSQL]  - No record found for %s - %s  ', tenantId, companyId);
            var jsonString = messageFormatter.FormatMessage(new Error('No record'), "EXCEPTION", false, undefined);
            callback.end(jsonString);
        }
    }).error(function (err) {
        logger.error('[DVP-ResAttributeGroups.GetAttributeByGroupIdWithDetails] - [%s] - [%s] - [PGSQL]  - Error in searching.-[%s]', tenantId, companyId, err);
        var jsonString = messageFormatter.FormatMessage(err, "EXCEPTION", false, undefined);
        callback.end(jsonString);
    });
}

function GetGroupDetailsByAttributeId(attributeId, tenantId, companyId, callback) {
    DbConn.ResAttributeGroups.findAll({
        where: [{AttributeId: attributeId}, {Status: true}, {TenantId: tenantId}, {CompanyId: companyId}],
        include: [{ model: DbConn.ResGroups,  as: "ResGroups" },
            { model: DbConn.ResAttribute, as: "ResAttribute"   }
        ]
    }).then(function (CamObject) {
        if (CamObject) {
            logger.info('[DVP-ResAttributeGroups.GetAttributeByGroupIdWithDetails] - [%s] - [PGSQL]  - Data found  - %s-[%s]', tenantId, companyId, JSON.stringify(CamObject));
            var jsonString = messageFormatter.FormatMessage(undefined, "SUCCESS", true, CamObject);

            callback.end(jsonString);
        }
        else {
            logger.error('[DVP-ResAttributeGroups.GetAttributeByGroupIdWithDetails] - [PGSQL]  - No record found for %s - %s  ', tenantId, companyId);
            var jsonString = messageFormatter.FormatMessage(new Error('No record'), "EXCEPTION", false, undefined);
            callback.end(jsonString);
        }
    }).error(function (err) {
        logger.error('[DVP-ResAttributeGroups.GetAttributeByGroupIdWithDetails] - [%s] - [%s] - [PGSQL]  - Error in searching.-[%s]', tenantId, companyId, err);
        var jsonString = messageFormatter.FormatMessage(err, "EXCEPTION", false, undefined);
        callback.end(jsonString);
    });
}

module.exports.CreateGroups = CreateGroups;
module.exports.EditGroups = EditGroups;
module.exports.DeleteGroups = DeleteGroups;
module.exports.GetAllGroups = GetAllGroups;
module.exports.GetAllGroupsPaging = GetAllGroupsPaging;
module.exports.GetGroupByGroupId = GetGroupByGroupId;
module.exports.AddAttributeToGroups = AddAttributeToGroups;
module.exports.AddAttributeToExsistingGroups = AddAttributeToExsistingGroups;
module.exports.GetAttributeByGroupId = GetAttributeByGroupId;
module.exports.GetAttributeByGroupIdWithDetails = GetAttributeByGroupIdWithDetails;
module.exports.GetGroupDetailsByAttributeId = GetGroupDetailsByAttributeId;
module.exports.DeleteAttributeFromGroup = DeleteAttributeFromGroup;
