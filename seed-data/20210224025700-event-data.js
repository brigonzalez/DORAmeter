/* eslint-disable */
'use strict';

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db) {
  return db.runSql(`
    INSERT INTO dorameter.event (app_id, event_type_id, created_timestamp) VALUES ('FAF01D98-04C5-4877-8163-F3C56C56C2DA', 'FA4A3814-1242-4E24-9A1A-868F176A10B7', NOW());
    INSERT INTO dorameter.event (app_id, event_type_id, created_timestamp) VALUES ('F6B54B3D-59E1-4C84-A868-52BBB7F5969F', 'FA4A3814-1242-4E24-9A1A-868F176A10B7', CURRENT_DATE - INTERVAL '2 day');
    INSERT INTO dorameter.event (app_id, event_type_id, created_timestamp) VALUES ('F26ED1CA-969B-4DD1-9043-2AC606B89209', 'FA4A3814-1242-4E24-9A1A-868F176A10B7', CURRENT_DATE - INTERVAL '8 day');
    INSERT INTO dorameter.event (app_id, event_type_id, created_timestamp) VALUES ('9C20C953-873B-4457-ABC7-B8025DA53144', 'FA4A3814-1242-4E24-9A1A-868F176A10B7', CURRENT_DATE - INTERVAL '1 day');
    INSERT INTO dorameter.event (app_id, event_type_id, created_timestamp) VALUES ('11EFBDD7-9A6C-44F6-A1EF-76919BA7F3A0', 'FA4A3814-1242-4E24-9A1A-868F176A10B7', CURRENT_DATE - INTERVAL '2 month');
    INSERT INTO dorameter.event (app_id, event_type_id, created_timestamp) VALUES ('2E991592-2D40-4F95-B560-E6999F6D2106', 'FA4A3814-1242-4E24-9A1A-868F176A10B7', NOW());
    INSERT INTO dorameter.event (app_id, event_type_id, created_timestamp) VALUES ('43D37920-CFBB-4CB7-BE7A-3B29F3A18C9B', 'FA4A3814-1242-4E24-9A1A-868F176A10B7', CURRENT_DATE - INTERVAL '10 day');
    INSERT INTO dorameter.event (app_id, event_type_id, created_timestamp) VALUES ('3ECEEDB9-9678-4FFC-A585-84F7CD2E48AB', 'FA4A3814-1242-4E24-9A1A-868F176A10B7', CURRENT_DATE - INTERVAL '3 month');
    `);
};

exports.down = function (db) {
  return db.runSql(`
        DELETE FROM dorameter.event;
    `);
};

exports._meta = {
  "version": 1
};
/* eslint-enable */
