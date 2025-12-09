-- Create content table
CREATE TABLE content (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    source TEXT NOT NULL
);

-- Insert 4 mockup entries
INSERT INTO content (title, source) VALUES
    ('Introduction to Web Development', 'https://developer.mozilla.org'),
    ('Understanding TypeScript Basics', 'https://typescriptlang.org'),
    ('Building with SolidJS', 'https://solidjs.com'),
    ('Database Design Patterns', 'https://postgresql.org');


