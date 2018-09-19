export interface IRequestErrorProps {
    status: number;
    statusText: string;
}

export class RequestError extends Error {
  status: Number | null = null;
  statusText: String | null = null;

  constructor(props: IRequestErrorProps) {
    super(props.statusText);
    this.status = props.status;
    this.statusText = props.statusText;
  }
}

const getMessageFromError = (errorBody) => {
  let returnValue = '';
  try {
    returnValue = JSON.parse(errorBody.text).message;
  } catch (e) {

  }

  return returnValue;
};

const handleResponseError = async (response: Response): Promise<any> => {
  const responseReturnValue = await response.json();

  if (!response.ok) {
    throw new RequestError({
      status: response.status,
      statusText: getMessageFromError(responseReturnValue.response) || response.statusText,
    });
  }

  return responseReturnValue;
};

export default handleResponseError;