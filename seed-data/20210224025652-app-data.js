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
    INSERT INTO dorameter.app (app_id, name) VALUES ('FAF01D98-04C5-4877-8163-F3C56C56C2DA', 'App A');
    INSERT INTO dorameter.app (app_id, name) VALUES ('F6B54B3D-59E1-4C84-A868-52BBB7F5969F', 'App B');
    INSERT INTO dorameter.app (app_id, name) VALUES ('F26ED1CA-969B-4DD1-9043-2AC606B89209', 'App C');
    INSERT INTO dorameter.app (app_id, name) VALUES ('9C20C953-873B-4457-ABC7-B8025DA53144', 'App D');
    INSERT INTO dorameter.app (app_id, name) VALUES ('470828F4-853A-44B8-A9A9-B6FFD4F5DF35', 'App E');
    INSERT INTO dorameter.app (app_id, name) VALUES ('11EFBDD7-9A6C-44F6-A1EF-76919BA7F3A0', 'App F');
    INSERT INTO dorameter.app (app_id, name) VALUES ('2E991592-2D40-4F95-B560-E6999F6D2106', 'App G');
    INSERT INTO dorameter.app (app_id, name) VALUES ('43D37920-CFBB-4CB7-BE7A-3B29F3A18C9B', 'App H');
    INSERT INTO dorameter.app (app_id, name) VALUES ('3ECEEDB9-9678-4FFC-A585-84F7CD2E48AB', 'App I');
  `);
};

exports.down = function (db) {
  return db.runSql(`
    DELETE FROM dorameter.app
    `);
};

exports._meta = {
  "version": 1
};
/* eslint-enable */
