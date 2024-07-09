/* eslint-disable react/prop-types */
import { Menu } from "@mui/material";

const FileMenu = ({ anchorEl }) => {
  return (
    <Menu anchorEl={anchorEl} open={false}>
      <div
        style={{
          width: "10rem",
        }}
      >
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Similique
        corporis eveniet ipsam debitis dolores aliquam, autem saepe blanditiis
        at, cumque iusto perspiciatis ipsa impedit fuga neque pariatur
        exercitationem explicabo obcaecati?
      </div>
    </Menu>
  );
};

export default FileMenu;