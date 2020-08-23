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
          CREATE TABLE dorameter.event_type
          (
            event_type_id   UUID NOT NULL,
            event_type      TEXT NOT NULL,
            CONSTRAINT event_type_pk PRIMARY KEY (event_type_id)
          );
          INSERT INTO dorameter.event_type (event_type_id, event_type)
          VALUES ('FA4A3814-1242-4E24-9A1A-868F176A10B7', 'DEPLOYMENT'),
                  ('6E44F1D3-C70D-4347-A5D7-9F6D3BB1682F', 'CODE_COMMITTED'),
                  ('8C94D3DA-58C7-43A3-B4D3-C94A592A0C22', 'SUCCESSFUL_TEST'),
                  ('D7BA9D32-2C70-4CFE-A406-B2BD1CF99DA8', 'UNSUCCESSFUL_TEST');
          ALTER TABLE dorameter.event
                ADD CONSTRAINT event_type_fk FOREIGN KEY (event_type_id)
                    REFERENCES dorameter.event_type (event_type_id) MATCH FULL
                    ON DELETE RESTRICT ON UPDATE CASCADE;
  `);
};

exports.down = function (db) {
    return db.runSql(`
  DROP TABLE dorameter.event_type
  `);
};

exports._meta = {
    "version": 1
};
/* eslint-enable */
