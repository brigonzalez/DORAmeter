CREATE TABLE app
(
    app_id        UUID NOT NULL,
    name          TEXT NOT NULL,
    CONSTRAINT app_pk PRIMARY KEY (app_id)
);

INSERT INTO app (app_id, name) values ('6E9B393D-2A4F-40C3-9765-2F258865A5F7', 'app a')
