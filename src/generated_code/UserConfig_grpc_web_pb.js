/**
 * @fileoverview gRPC-Web generated client stub for UserConfigService
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.UserConfigService = require('./UserConfig_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.UserConfigService.UserConfigurationServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

  /**
   * @private @const {?Object} The credentials to be used to connect
   *    to the server
   */
  this.credentials_ = credentials;

  /**
   * @private @const {?Object} Options for the client
   */
  this.options_ = options;
};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.UserConfigService.UserConfigurationServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

  /**
   * @private @const {?Object} The credentials to be used to connect
   *    to the server
   */
  this.credentials_ = credentials;

  /**
   * @private @const {?Object} Options for the client
   */
  this.options_ = options;
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.UserConfigService.UserGridConfigRequest,
 *   !proto.UserConfigService.UserGridConfigResponse>}
 */
const methodInfo_UserConfigurationService_GetGridConfig = new grpc.web.AbstractClientBase.MethodInfo(
  proto.UserConfigService.UserGridConfigResponse,
  /** @param {!proto.UserConfigService.UserGridConfigRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.UserConfigService.UserGridConfigResponse.deserializeBinary
);


/**
 * @param {!proto.UserConfigService.UserGridConfigRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.UserConfigService.UserGridConfigResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.UserConfigService.UserGridConfigResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.UserConfigService.UserConfigurationServiceClient.prototype.getGridConfig =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/UserConfigService.UserConfigurationService/GetGridConfig',
      request,
      metadata || {},
      methodInfo_UserConfigurationService_GetGridConfig,
      callback);
};


/**
 * @param {!proto.UserConfigService.UserGridConfigRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.UserConfigService.UserGridConfigResponse>}
 *     A native promise that resolves to the response
 */
proto.UserConfigService.UserConfigurationServicePromiseClient.prototype.getGridConfig =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/UserConfigService.UserConfigurationService/GetGridConfig',
      request,
      metadata || {},
      methodInfo_UserConfigurationService_GetGridConfig);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.UserConfigService.UserGridConfigSaveRequest,
 *   !proto.UserConfigService.UserGridConfigSaveResponse>}
 */
const methodInfo_UserConfigurationService_SaveGridConfig = new grpc.web.AbstractClientBase.MethodInfo(
  proto.UserConfigService.UserGridConfigSaveResponse,
  /** @param {!proto.UserConfigService.UserGridConfigSaveRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.UserConfigService.UserGridConfigSaveResponse.deserializeBinary
);


/**
 * @param {!proto.UserConfigService.UserGridConfigSaveRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.UserConfigService.UserGridConfigSaveResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.UserConfigService.UserGridConfigSaveResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.UserConfigService.UserConfigurationServiceClient.prototype.saveGridConfig =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/UserConfigService.UserConfigurationService/SaveGridConfig',
      request,
      metadata || {},
      methodInfo_UserConfigurationService_SaveGridConfig,
      callback);
};


/**
 * @param {!proto.UserConfigService.UserGridConfigSaveRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.UserConfigService.UserGridConfigSaveResponse>}
 *     A native promise that resolves to the response
 */
proto.UserConfigService.UserConfigurationServicePromiseClient.prototype.saveGridConfig =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/UserConfigService.UserConfigurationService/SaveGridConfig',
      request,
      metadata || {},
      methodInfo_UserConfigurationService_SaveGridConfig);
};


module.exports = proto.UserConfigService;

