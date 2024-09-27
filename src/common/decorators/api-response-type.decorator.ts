import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { ResponseDto } from '../dto/response.dto';

type SchemaObjectType = 'object' | 'array' | 'null';

export function ApiResponseType<TModel extends Type<any> | null = null>(
  model?: TModel,
  isArray: boolean = false,
) {
  const decorators = [
    ApiOkResponse(
      getResponseSchema(model, model ? (isArray ? 'array' : 'object') : 'null'),
    ),
  ];

  if (model) {
    decorators.unshift(ApiExtraModels(ResponseDto, model));
  } else {
    decorators.unshift(ApiExtraModels(ResponseDto));
  }

  return applyDecorators(...decorators);
}

function getResponseSchema(
  dataType: Type<any> | null,
  schemaType: SchemaObjectType = 'object',
) {
  const baseSchema = {
    allOf: [
      { $ref: getSchemaPath(ResponseDto) },
      {
        properties: {
          data: getDataSchema(dataType, schemaType),
        },
      },
    ],
  };

  return { schema: baseSchema };
}

function getDataSchema(
  dataType: Type<any> | null,
  schemaType: SchemaObjectType,
) {
  if (schemaType === 'null' || !dataType) {
    return { type: 'null' };
  }

  if (schemaType === 'array') {
    return {
      type: 'array',
      items: { $ref: getSchemaPath(dataType) },
    };
  }

  return { $ref: getSchemaPath(dataType) };
}
