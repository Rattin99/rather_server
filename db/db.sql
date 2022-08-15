USE rather_db;

CREATE TABLE posts(
    post_id VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    post_text VARCHAR(420),
    post_visits INT DEFAULT 0,
    post_ranked_by INT DEFAULT 0,
    PRIMARY KEY (post_id)
);


CREATE TABLE images(
   image_url VARCHAR(512) CHARACTER SET 'ascii' COLLATE 'ascii_general_ci' NOT NULL,
   post_id VARCHAR(255),
   ranking INT DEFAULT 1400,
   PRIMARY KEY(image_url)
);

CREATE TABLE user_ids(
    user_id VARCHAR(255),
    paid BOOLEAN,
    used BOOLEAN,
    PRIMARY KEY(user_id)
);

CREATE TABLE checking(
    user_id VARCHAR(255),
    post_id VARCHAR(255),
    if_checked BOOLEAN,
    PRIMARY KEY(user_id,post_id)
)




