import { DocumentNode, GraphQLSchema } from 'graphql';
import { BatchingOptions, FetchAPI, Plugin, YogaServerOptions } from 'graphql-yoga';
import { GraphiQLOptionsOrFactory } from 'graphql-yoga/typings/plugins/use-graphiql';
import { SupergraphPlugin, TransportsOption } from '@graphql-mesh/fusion-runtime';
// eslint-disable-next-line import/no-extraneous-dependencies
import { KeyValueCache, Logger, MeshFetch, MeshPubSub, OnFetchHook } from '@graphql-mesh/types';
import { HTTPExecutorOptions } from '@graphql-tools/executor-http';
import { IResolvers } from '@graphql-tools/utils';
import { CORSPluginOptions } from '@whatwg-node/server';

export type MeshHTTPPlugin<TServerContext, TUserContext> = Plugin<
  {},
  TServerContext,
  TUserContext
> &
  SupergraphPlugin & {
    onFetch?: OnFetchHook<TServerContext & TUserContext>;
  };

export type SupergraphConfig =
  | GraphQLSchema
  | DocumentNode
  | string
  | (() => SupergraphConfig)
  | Promise<SupergraphConfig>;

export type MeshHTTPHandlerConfiguration<TServerContext, TUserContext> =
  | MeshHTTPHandlerConfigurationWithSourceInput<TServerContext, TUserContext>
  | MeshHTTPHandlerConfigurationWithCache<TServerContext, TUserContext>
  | MeshHTTPHandlerConfigurationWithPubSub<TServerContext, TUserContext>;

type MeshHTTPHandlerConfigurationWithCache<TServerContext, TUserContext> = Omit<
  MeshHTTPHandlerConfigurationWithSourceInput<TServerContext, TUserContext>,
  'plugins'
> & {
  cache: KeyValueCache;
  plugins?(
    serveContext: MeshServeContext & { cache: KeyValueCache },
  ): MeshHTTPPlugin<TServerContext, TUserContext>[];
};

type MeshHTTPHandlerConfigurationWithPubSub<TServerContext, TUserContext> = Omit<
  MeshHTTPHandlerConfigurationWithSourceInput<TServerContext, TUserContext>,
  'plugins'
> & {
  pubsub: MeshPubSub;
  plugins?(
    serveContext: MeshServeContext & { pubsub: MeshPubSub },
  ): MeshHTTPPlugin<TServerContext, TUserContext>[];
};

type MeshHTTPHandlerConfigurationWithSourceInput<TServerContext, TUserContext> =
  | MeshHTTPHandlerConfigurationWithSupergraph<TServerContext, TUserContext>
  | MeshHTTPHandlerConfigurationWithHttpEndpoint<TServerContext, TUserContext>;

interface MeshHTTPHandlerConfigurationWithSupergraph<TServerContext, TUserContext>
  extends MeshHTTPHandlerBaseConfiguration<TServerContext, TUserContext> {
  /**
   * Path to the Supergraph Schema
   */
  supergraph?: SupergraphConfig;
  /**
   * Supergraph spec
   *
   * @default 'fusion'
   */
  spec?: 'federation' | 'fusion';
}

interface MeshHTTPHandlerConfigurationWithHttpEndpoint<TServerContext, TUserContext>
  extends MeshHTTPHandlerBaseConfiguration<TServerContext, TUserContext> {
  http: HTTPExecutorOptions;
}

interface MeshHTTPHandlerBaseConfiguration<TServerContext, TUserContext> {
  /**
   * Headers to be sent to the Supergraph Schema endpoint
   */
  schemaHeaders?: Record<string, string>;
  /**
   * Polling interval in milliseconds
   */
  polling?: number;

  /**
   * Plugins
   */
  plugins?(serveContext: MeshServeContext): MeshHTTPPlugin<TServerContext, TUserContext>[];
  /**
   * Configuration for CORS
   */
  cors?: CORSPluginOptions<TServerContext>;
  /**
   * Show GraphiQL
   */
  graphiql?: GraphiQLOptionsOrFactory<TServerContext>;
  /**
   *  Enable and define a limit for [Request Batching](https://github.com/graphql/graphql-over-http/blob/main/rfcs/Batching.md)
   */
  batching?: BatchingOptions;
  /**
   * Imported transports
   */
  transports?: TransportsOption;
  /**
   * WHATWG compatible Fetch implementation
   */
  fetchAPI?: FetchAPI;
  /**
   * Logger
   */
  logging?: YogaServerOptions<TServerContext, TUserContext>['logging'] | Logger;
  /**
   * Additional Resolvers
   */
  additionalResolvers?: IResolvers<unknown, TServerContext & TUserContext>;
  /**
   * Endpoint
   */
  graphqlEndpoint?: string;
  /**
   * Masked errors
   */
  maskedErrors?: YogaServerOptions<TServerContext, TUserContext>['maskedErrors'];
}

export interface MeshServeContext {
  fetch: MeshFetch;
  logger: Logger;
  cwd: string;
  pubsub?: MeshPubSub;
  cache?: KeyValueCache;
}