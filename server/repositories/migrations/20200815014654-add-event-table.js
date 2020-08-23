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
        CREATE TABLE dorameter.event
        (
            event_id          UUID NOT NULL DEFAULT uuid_generate_v1(),
            app_id            UUID NOT NULL,
            event_type_id     UUID NOT NULL,
            created_timestamp TIMESTAMP WITHOUT TIME ZONE DEFAULT (NOW() AT TIME ZONE 'UTC'),
            CONSTRAINT event_pk PRIMARY KEY (event_id)
        );
        ALTER TABLE dorameter.event
            ADD CONSTRAINT app_fk FOREIGN KEY (app_id)
                REFERENCES dorameter.app (app_id) MATCH FULL
                ON DELETE RESTRICT ON UPDATE CASCADE;
    `);
};

exports.down = function (db) {
    return db.runSql(`
        DROP TABLE dorameter.event
    `);
};

exports._meta = {
    "version": 1
};
/* eslint-enable */
