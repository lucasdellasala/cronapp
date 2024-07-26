import axios, { Method, AxiosRequestHeaders } from 'axios';

export async function makeApiCall(
  url: string,
  method: Method,
  headers: Record<string, string>,
  body: any
): Promise<any> {
  try {
    const response = await axios({
      url,
      method,
      headers: headers as AxiosRequestHeaders,
      data: body,
    });
    return response.data;
  } catch (error: any) {
    console.error(`❌${error.status? error.status: ''} Error making API call to ${url} with METHOD: ${method}, headers: ${JSON.stringify(headers)}, body: ${JSON.stringify(body)}.`);
    throw error.errors? error.errors: error;
  }
}
