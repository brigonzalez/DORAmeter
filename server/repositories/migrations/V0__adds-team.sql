CREATE TABLE team
(
    team_id        UUID NOT NULL,
    name           TEXT NOT NULL,
    CONSTRAINT team_pk PRIMARY KEY (team_id)
);

INSERT INTO team (team_id, name) values ('AF7E0B34-86E9-430A-AC6B-BDF0555A1704', 'team a')