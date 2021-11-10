"use strict";

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
        CREATE TABLE dorameter.app
        (
          app_id        UUID UNIQUE NOT NULL DEFAULT uuid_generate_v4(),
          name          TEXT UNIQUE NOT NULL,
          CONSTRAINT app_pk PRIMARY KEY (app_id)
        );
  `);
};

exports.down = function (db) {
  return db.runSql("DROP TABLE dorameter.app");
};

exports._meta = {
  version: 1,
};
