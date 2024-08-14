/* eslint-disable react/prop-types */
import { Helmet } from "react-helmet-async"
const Title = ({title="ChatVista | Chat App", description="This is the Chat App called ChatVista."}) => {
  return <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
    </Helmet>;
};

export default Title;