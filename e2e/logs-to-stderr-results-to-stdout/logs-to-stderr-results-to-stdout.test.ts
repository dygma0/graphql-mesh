import { createTenv } from '../tenv';

const { serve, compose } = createTenv(__dirname);

it('should write serve logs to stderr', async () => {
  const proc = await serve(55001);
  proc.kill();
  await proc.waitForExit;

  expect(proc.getStd('out')).toBeFalsy();
  expect(proc.getStd('err')).toContain('Started server on');
});

it('should write compose output to stdout and logs to stderr', async () => {
  const proc = await compose();
  await proc.waitForExit;

  expect(proc.getStd('out')).toMatchInlineSnapshot(`
"schema {
  query: Query
}

type Query {
  hello: String @resolver(subgraph: "helloworld", operation: "query hello { hello }") @source(subgraph: "helloworld", name: "hello", type: "String")
}
"
`);
  expect(proc.getStd('err')).toMatchInlineSnapshot(`
"- Starting Mesh Compose CLI
- Starting Mesh Compose CLI
- Loading Mesh Compose CLI Config from e2e/logs-to-stderr-results-to-stdout/mesh.config.ts
- Starting Mesh Compose CLI
- Loaded Mesh Compose CLI Config from e2e/logs-to-stderr-results-to-stdout/mesh.config.ts
- Starting Mesh Compose CLI
- Loaded Mesh Compose CLI Config from e2e/logs-to-stderr-results-to-stdout/mesh.config.ts
- Loading subgraph helloworld
- Starting Mesh Compose CLI
- Loaded Mesh Compose CLI Config from e2e/logs-to-stderr-results-to-stdout/mesh.config.ts
- Loaded subgraph helloworld
- Starting Mesh Compose CLI
- Loaded Mesh Compose CLI Config from e2e/logs-to-stderr-results-to-stdout/mesh.config.ts
- Loaded subgraph helloworld
- Composing fusiongraph
- Starting Mesh Compose CLI
- Loaded Mesh Compose CLI Config from e2e/logs-to-stderr-results-to-stdout/mesh.config.ts
- Loaded subgraph helloworld
- Composed fusiongraph
- Starting Mesh Compose CLI
- Loaded Mesh Compose CLI Config from e2e/logs-to-stderr-results-to-stdout/mesh.config.ts
- Loaded subgraph helloworld
- Composed fusiongraph
- Writing Fusiongraph
- Starting Mesh Compose CLI
- Loaded Mesh Compose CLI Config from e2e/logs-to-stderr-results-to-stdout/mesh.config.ts
- Loaded subgraph helloworld
- Composed fusiongraph
- Written fusiongraph to stdout
- Finished Mesh Compose CLI
- Loaded Mesh Compose CLI Config from e2e/logs-to-stderr-results-to-stdout/mesh.config.ts
- Loaded subgraph helloworld
- Composed fusiongraph
- Written fusiongraph to stdout
"
`);
});
