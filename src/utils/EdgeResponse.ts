export default class EdgeResponse {
  static json<T>(status: number, value: T) {
    return new Response(JSON.stringify(value), {
      status,
      headers: {
        "content-type": "application/json",
      },
    });
  }

  static text(status: number, value: string) {
    return new Response(value, {
      status,
      headers: {
        "content-type": "text/plain",
      },
    });
  }
}
