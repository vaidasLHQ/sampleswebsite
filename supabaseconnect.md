# Supabase Connection Guide for AI

## ⚡ JUST DO THIS

```bash
export SUPABASE_ACCESS_TOKEN=sbp_a1f8e5e27de07476b8f036f471fdbe8621f60218
npx supabase link --project-ref qborzulfzciqhjyfxcjz
```

Done. That's it.

---

## ✅ DO

- Use CLI with the access token above (non-interactive, works immediately)
- Use `supabase` CLI for all database operations
- Frontend queries: use existing `~/lib/supabase` client

## ❌ DON'T

- Don't run `supabase login` (requires browser)
- Don't create test scripts or connection verification scripts
- Don't use `pg` package for simple operations (CLI is easier)
- Don't overcomplicate - the setup is already done

---

## Project Details

| Property | Value |
|----------|-------|
| **Project ID** | `qborzulfzciqhjyfxcjz` |
| **Project URL** | `https://qborzulfzciqhjyfxcjz.supabase.co` |
| **Access Token** | `sbp_a1f8e5e27de07476b8f036f471fdbe8621f60218` |

## Frontend (already configured)

`.env` has the anon key. Just use:

```typescript
import { supabase } from '~/lib/supabase';
const { data } = await supabase.from('articles').select('*');
```

## CLI Commands

```bash
export SUPABASE_ACCESS_TOKEN=sbp_a1f8e5e27de07476b8f036f471fdbe8621f60218

npx supabase db pull                    # Pull remote schema
npx supabase db push                    # Push migrations
npx supabase gen types typescript       # Generate TypeScript types
npx supabase status                     # Check status
npx supabase migration new <name>       # Create migration
```

## Direct DB (only if CLI can't do it)

```javascript
import pg from 'pg';
const client = new pg.Client({
  host: 'db.qborzulfzciqhjyfxcjz.supabase.co',
  port: 5432,
  user: 'postgres',
  password: 'BoNyqQiuoREPoedV',
  database: 'postgres',
  ssl: { rejectUnauthorized: false }
});
```

## Existing Tables

| Table | Description |
|-------|-------------|
| `articles` | Blog articles with title, slug, content, author |
