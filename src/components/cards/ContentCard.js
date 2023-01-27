import { Typography, Box, Modal } from "@mui/material";

const ContentCard = (props) => {

  return (
    <Modal
      open={props.showContent}
      sx={{display:"flex", alignItems:"center", justifyContent:"center"}}
      onClose={() => {props.setShowContent(false)}}
    >
      <Box
        sx={{
          marginLeft: "1rem",
          overflowY: "scroll",
          backgroundColor: "#FD8A8A",
          opacity:0.9,
          borderStyle: "solid",
          borderColor: "#FD8A8A",
          display: "flex",
          justifyContent: "center",
          position: "absolute",
          width: "70%",
          height: "60%",
          borderRadius: "2rem",
        }}
      >
        <Typography
          sx={{
            fontSize: "2.5rem",
            color: "white",
            padding: "4%",
            paddingTop: "2rem",

          }}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
          sapiente reiciendis nobis natus aspernatur debitis. Odio, excepturi
          cum tempore deserunt tempora vel? Tempore maxime tempora aut,
          doloribus beatae ab consequatur? Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Corporis, obcaecati fuga excepturi
          perferendis hic quam deserunt natus debitis quod, voluptates veniam
          pariatur. Aperiam soluta blanditiis at tempore cum magnam assumenda!
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Error,
          molestias aliquam, nobis dignissimos culpa incidunt quibusdam illo
          labore ab beatae suscipit corrupti, delectus maxime. Animi omnis ea
          repellendus excepturi mollitia? Lorem ipsum, dolor sit amet
          consectetur adipisicing elit. Vero consectetur autem obcaecati quasi
          similique cum nulla. Unde libero ipsa repellat doloribus labore nisi.
          Nihil tenetur doloribus rerum repudiandae dolorem incidunt.
        </Typography>
      </Box>
    </Modal>
  );
};

export default ContentCard;

/*<Box
      sx={{
        marginTop: "1rem",
        marginLeft: "1rem",
        overflowY: "scroll",
      }}
    >
      <Typography
        sx={{
          fontSize: "2.5rem",
          color: "gray",
          padding: "4%",
          paddingTop: "2rem",
        }}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias sapiente
        reiciendis nobis natus aspernatur debitis. Odio, excepturi cum tempore
        deserunt tempora vel? Tempore maxime tempora aut, doloribus beatae ab
        consequatur? Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Corporis, obcaecati fuga excepturi perferendis hic quam deserunt natus
        debitis quod, voluptates veniam pariatur. Aperiam soluta blanditiis at
        tempore cum magnam assumenda! Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Error, molestias aliquam, nobis dignissimos culpa
        incidunt quibusdam illo labore ab beatae suscipit corrupti, delectus
        maxime. Animi omnis ea repellendus excepturi mollitia? Lorem ipsum,
        dolor sit amet consectetur adipisicing elit. Vero consectetur autem
        obcaecati quasi similique cum nulla. Unde libero ipsa repellat doloribus
        labore nisi. Nihil tenetur doloribus rerum repudiandae dolorem incidunt.
      </Typography>
    </Box>*/
