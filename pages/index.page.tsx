import type { NextPage } from "next";
import { withSessionSsr } from "@database/session";
import Navigation from "@components/navigation/navigation";
import CustomHeader from "@components/customHeader/customHeader";
import { Song } from "@database/songModel";
import Songs from "@components/songs/songs";
import { Col, Container, Row } from "react-bootstrap";
import AudioContextProvider from "../contexts/audioContextProvider";
import { Miniature } from "@database/miniatureModel";

type Props = {
  id_user?: string;
  songsSerialized?: string;
  count?: number;
};

const Home: NextPage<Props> = ({ id_user, songsSerialized, count }) => {
  if (!id_user) return null;

  return (
    <CustomHeader>
      <Navigation id_user={id_user} />
      <Container className={"my-5"}>
        <Row>
          <Col
            xs={{ span: 12 }}
            md={{ span: 8, offset: 2 }}
            xl={{ span: 6, offset: 3 }}
          >
            <AudioContextProvider>
              <Songs songsSerialized={songsSerialized} count={count} />
            </AudioContextProvider>
          </Col>
        </Row>
      </Container>
    </CustomHeader>
  );
};

export const getServerSideProps = withSessionSsr<Props>(
  async ({ req, res }) => {
    const user = req.session.user;

    if (!user) {
      res.setHeader("location", "/login");
      res.statusCode = 302;
      res.end();
      return { props: {} };
    }

    try {
      const { rows, count } = await Song.findAndCountAll({
        attributes: ["id_song", "title", "path"],
        include: [
          {
            model: Miniature,
            required: true,
            attributes: ["id_miniature", "path"],
          },
        ],
        limit: 10,
      });

      return {
        props: {
          id_user: user.id_user,
          songsSerialized: JSON.stringify(rows),
          count,
        },
      };
    } catch (e) {
      console.log(e);
      return { props: {} };
    }
  }
);

export default Home;
