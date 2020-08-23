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
        CREATE TABLE dorameter.metric_goal
        (
            metric_goal_id UUID NOT NULL,
            elite_goal     TEXT NOT NULL,
            high_goal      TEXT NOT NULL,
            medium_goal    TEXT NOT NULL,
            low_goal       TEXT NOT NULL,
            CONSTRAINT metric_goal_pk PRIMARY KEY (metric_goal_id)
        );
        INSERT INTO dorameter.metric_goal (metric_goal_id, elite_goal, high_goal, medium_goal, low_goal)
        VALUES ('2F339B14-8978-4557-8BAE-ED546018D451', '24 H', '168 H', '1 M', '6 M'),
               ('BBFC3A39-621F-4F00-8326-136AC7D494C0', '1 H', '24 H', '168 H', '1 M'),
               ('5667C118-5563-43DC-B3C8-3A7DCE3B3E09', '15 %', '30 %', '45 %', '60 %');
        CREATE TABLE dorameter.metric
        (
            metric_id UUID NOT NULL,
            metric    TEXT NOT NULL,
            CONSTRAINT metric_pk PRIMARY KEY (metric_id)
        );
        INSERT INTO dorameter.metric (metric_id, metric)
        VALUES ('93872B01-781B-400C-B04A-53448440B46A', 'DEPLOYMENT_FREQUENCY'),
               ('AF7D5112-CC66-404B-A6D5-DB381CA6A9F3', 'LEAD_TIME_FOR_CHANGES'),
               ('A0A66BEB-21D4-4F6E-9B48-B13CB1C3A254', 'TIME_TO_RESTORE_SERVICE'),
               ('9847BC16-8DCC-4BC6-B680-8852189A7BEA', 'CHANGE_FAILURE_RATE');
        CREATE TABLE dorameter.metric_to_metric_goal
        (
            metric_id       UUID NOT NULL,
            metric_goal_id  UUID NOT NULL
        );
        INSERT INTO dorameter.metric_to_metric_goal (metric_id, metric_goal_id)
        VALUES ('93872B01-781B-400C-B04A-53448440B46A', '2F339B14-8978-4557-8BAE-ED546018D451'),
               ('AF7D5112-CC66-404B-A6D5-DB381CA6A9F3', '2F339B14-8978-4557-8BAE-ED546018D451'),
               ('A0A66BEB-21D4-4F6E-9B48-B13CB1C3A254', 'BBFC3A39-621F-4F00-8326-136AC7D494C0'),
               ('9847BC16-8DCC-4BC6-B680-8852189A7BEA', '5667C118-5563-43DC-B3C8-3A7DCE3B3E09');
        ALTER TABLE dorameter.metric_to_metric_goal
            ADD CONSTRAINT metric_fk FOREIGN KEY (metric_id)
                REFERENCES dorameter.metric (metric_id) MATCH FULL
                ON DELETE RESTRICT ON UPDATE CASCADE;
        ALTER TABLE dorameter.metric_to_metric_goal
            ADD CONSTRAINT metric_goal_fk FOREIGN KEY (metric_goal_id)
                REFERENCES dorameter.metric_goal (metric_goal_id) MATCH FULL
                ON DELETE RESTRICT ON UPDATE CASCADE;
    `);
};

exports.down = function (db) {
    return db.runSql(`
        DROP TABLE dorameter.metric_goal;
        DROP TABLE dorameter.metric_to_metric_goal;
        DROP TABLE dorameter.metric;
    `);
};

exports._meta = {
    "version": 1
};
