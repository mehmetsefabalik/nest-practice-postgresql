CREATE TABLE subscription(
    id TEXT PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    frequency TEXT NOT NULL,
    country TEXT NOT NULL,
    createdAt TIMESTAMP WITH TIME ZONE NOT NULL,
    updatedAt TIMESTAMP WITH TIME ZONE NOT NULL,
    isVerified BOOLEAN NOT NULL
);