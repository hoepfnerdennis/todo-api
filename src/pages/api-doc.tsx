import dynamic from "next/dynamic";
import "swagger-ui-react/swagger-ui.css";
import spec from "../../public/api-doc.json";

const SwaggerUI = dynamic(import("swagger-ui-react"), { ssr: false });

export default function ApiDoc() {
  return <SwaggerUI spec={spec} />;
}
