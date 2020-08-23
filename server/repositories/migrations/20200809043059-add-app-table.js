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
        CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
        CREATE TABLE dorameter.app
        (
          app_id        UUID NOT NULL DEFAULT uuid_generate_v1(),
          name          TEXT NOT NULL,
          CONSTRAINT app_pk PRIMARY KEY (app_id)
        );
  `);
};

exports.down = function (db) {
    return db.runSql('DROP TABLE dorameter.app');
};

exports._meta = {
    "version": 1
};
/* eslint-enable */
