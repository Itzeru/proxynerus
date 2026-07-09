import { Database } from 'sqlite3';

const db:Database = new Database("database/cards.db");

// Create table
db.prepare(
    `CREATE TABLE IF NOT EXISTS card(
        name_og TEXT PRIMARY KEY, 
        name TEXT UNIQUE,
        mana TEXT,
        rules TEXT,
        power TEXT,
        thoughness TEXT,
        layout INTEGER NOT NULL,
        loyalty TEXT, 
        defense TEXT,
        artist TEXT,
        art TEXT,
        last_update DATETIME DEFAULT CURRENT_TIMESTAMP
    );`
).run();

// Create
export async function createCard(req: Request/*, res: Response*/) {
  const c = (await req.json()) as Record<string, unknown>;

  db.prepare(`INSERT INTO card VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`).run(
    c.name_og,
    c.name,
    c.mana,
    c.rules,
    c.power,
    c.thoughness,
    c.layout,
    c.loyalty,
    c.defense,
    c.artist,
    c.art
  );

  return new Response(null, { status: 201 });
}

// Read
export async function readCard(req: Request) {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');

    if (!id) {
        return Response.json({ error: 'Missing id' }, { status: 400 });
    }

    const res = db.prepare(`SELECT * FROM card WHERE name_og = ?`).get(id);

    if (!res) {
        return Response.json({ error: 'Card not found' }, { status: 404 });
    }

    return Response.json(res, { status: 200 });
}

// Update
export async function updateCard(req: Request, /*res: Response*/) {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');

    if (!id) {
        return Response.json({ error: 'Missing id' }, { status: 400 });
    }

    const c = (await req.json()) as Record<string, unknown>;

    db.prepare(
        `UPDATE card SET
            name = ?,
            mana = ?,
            rules = ?,
            power = ?,
            thoughness = ?,
            layout = ?,
            loyalty = ?,
            defense = ?,
            artist = ?,
            art = ?,
            last_update = ?
        WHERE name_og = ?;`
    ).run(
        c.name,
        c.mana,
        c.rules,
        c.power,
        c.thoughness,
        c.layout,
        c.loyalty,
        c.defense,
        c.artist,
        c.art,
        Date.now(),
        id
    );

    return new Response(null, { status: 200 });
}

// Delete
export async function deleteCard(req: Request, /*res: Response*/) {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');

    if (!id) {
        return Response.json({ error: 'Missing id' }, { status: 400 });
    }

    db.prepare(`DELETE FROM card WHERE name_og = ?`).run(id);

    return new Response(null, { status: 201 });
}