/* eslint-disable react-hooks/exhaustive-deps */
import {
  InfoOutlineIcon,
  CheckIcon,
  ExternalLinkIcon,
  Icon,
  MoonIcon,
  SunIcon,
} from "@chakra-ui/icons";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Box,
  CloseButton,
  DarkMode,
  Flex,
  IconButton,
  LightMode,
  Link,
  SlideFade,
  Tag,
  TagLabel,
  TagRightIcon,
  Text,
  Textarea,
  Tooltip,
  useColorMode,
  useColorModeValue,
  useToast,
  UnorderedList,
  ListItem
} from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import Graph from "react-graph-vis";
import useResizeObserver from "use-resize-observer";
import * as C from "../constants";
import { GraphContext, UserContext } from "../Contexts";
import CategoryTagStack from "./CategoryTagStack";
import LoadingGraph from "./LoadingGraph";

const Body = (props) => {
  const {
    graph,
    aprobar,
    setNetwork,
    redraw,
    setNodes,
    setEdges,
    desaprobar,
    getNode,
    edges,
    loadingGraph,
    network,
    openCBC,
  } = React.useContext(GraphContext);
  const { user, logged, submitBug } = React.useContext(UserContext);
  const { setDisplayedNode } = props;
  const toast = useToast();
  const bugToast = React.useRef();
  const { colorMode, toggleColorMode } = useColorMode();

  const ref = useRef(null);
  const { width, height } = useResizeObserver({ ref });

  useEffect(redraw, [width, height]);

  const events = {
    click: (e) => {
      const id = e.nodes[0];
      if (id === "CBC") {
        openCBC();
        return;
      }
      const node = getNode(id);
      if (!node) {
        if (logged) setDisplayedNode("");
        return;
      }
      if (logged) {
        setDisplayedNode(id);
        return;
      }
      if (!node.aprobada) {
        aprobar(id, 4);
      } else {
        desaprobar(id);
      }
    },
    doubleClick: (e) => {
      const id = e.nodes[0];
      if (!logged) return;
      if (id === "CBC") return;
      const node = getNode(id);
      if (!node) return;
      setDisplayedNode(id);
      if (!node.aprobada) {
        aprobar(id, 4);
      } else {
        desaprobar(id);
      }
    },
    hold: (e) => {
      const id = e.nodes[0];
      if (!logged) return;
      if (id === "CBC") return;
      const node = getNode(id);
      if (!node) return;
      setDisplayedNode(id);
      if (!(node.nota === -1)) {
        aprobar(id, -1);
      } else {
        desaprobar(id);
      }
    },
    hoverNode: (e) => {
      const id = e.node;

      // ### Este codigo triguerea un update en nodes, haciendo que se re-renderice el grafo como cuando se aprueba una materia. Si estuviese la fisica prendida, esto no pasaria
      // const neighborNodes = network.getConnectedNodes(id);
      // const allOtherNodes = nodes.get({
      //   filter: function (node) {
      //     return !neighborNodes.includes(node.id) && !(node.id === id);
      //   },
      // });
      // nodes.update(
      //   allOtherNodes.map((node) => {
      //     node.opacity = 0.6;
      //     return node;
      //   })
      // );

      const neighborEdges = network.getConnectedEdges(id);
      const allOtherEdges = edges.get({
        filter: function (edge) {
          return !neighborEdges.includes(edge.id);
        },
      });
      edges.update(
        allOtherEdges.map((edge) => {
          edge.arrows = { to: { enabled: false } };
          edge.dashes = true;
          edge.color = { opacity: 0.6 };
          return edge;
        })
      );
    },
    blurNode: (e) => {
      const id = e.node;
      // ### Este codigo triguerea un update en nodes, haciendo que se re-renderice el grafo como cuando se aprueba una materia. Si estuviese la fisica prendida, esto no pasaria
      // const neighborNodes = network.getConnectedNodes(id);
      // const allOtherNodes = nodes.get({
      //   filter: function (node) {
      //     return !neighborNodes.includes(node.id) && !(node.id === id);
      //   },
      // });
      // nodes.update(
      //   allOtherNodes.map((node) => {
      //     node.opacity = undefined;
      //     return node;
      //   })
      // );

      const neighborEdges = network.getConnectedEdges(id);
      const allOtherEdges = edges.get({
        filter: function (edge) {
          return !neighborEdges.includes(edge.id);
        },
      });
      edges.update(
        allOtherEdges.map((edge) => {
          edge.arrows = { to: { enabled: true } };
          edge.dashes = false;
          edge.color = null;
          return edge;
        })
      );
    },
  };

  return (
    <Box
      ref={ref}
      css={{ "& *:focus": { outline: "none" } }}
      bg={useColorModeValue("graphbg", "graphbgdark")}
      flexGrow="1"
      height="1em"
      position="relative"
    >
      <SlideFade in={loadingGraph} unmountOnExit>
        <LoadingGraph />
      </SlideFade>
      <Graph
        key={user.carrera?.id}
        graph={graph}
        getNetwork={(r) => {
          setNetwork(r);
        }}
        getNodes={(r) => {
          r.carrera = user.carrera?.id;
          setNodes(r);
        }}
        getEdges={(r) => {
          setEdges(r);
        }}
        options={C.GRAPHOPTIONS}
        events={events}
      />
      <CategoryTagStack />
      <Box
        mb={3}
        textAlign="right"
        mr={2}
        bottom={0}
        right={0}
        position="absolute"
      >
        <Tooltip
          label={`${useColorModeValue("Dark", "Light")} theme`}
          placement="top"
        >
          <Link
            color={useColorModeValue("text", "textdark")}
            onClick={toggleColorMode}
          >
            {useColorModeValue(<MoonIcon />, <SunIcon />)}
          </Link>
        </Tooltip>
        <Tooltip label="alejorodriguez96/ISFDT24-Map" placement="top">
          <Link
            isExternal
            color={useColorModeValue("text", "textdark")}
            href="https://github.com/alejorodriguez96/ISFDT24-Map"
          >
            <Icon boxSize={5} ml={2} viewBox="0 0 16 16">
              <path
                fill="currentColor"
                d="M7.999,0.431c-4.285,0-7.76,3.474-7.76,7.761 c0,3.428,2.223,6.337,5.307,7.363c0.388,0.071,0.53-0.168,0.53-0.374c0-0.184-0.007-0.672-0.01-1.32 c-2.159,0.469-2.614-1.04-2.614-1.04c-0.353-0.896-0.862-1.135-0.862-1.135c-0.705-0.481,0.053-0.472,0.053-0.472 c0.779,0.055,1.189,0.8,1.189,0.8c0.692,1.186,1.816,0.843,2.258,0.645c0.071-0.502,0.271-0.843,0.493-1.037 C4.86,11.425,3.049,10.76,3.049,7.786c0-0.847,0.302-1.54,0.799-2.082C3.768,5.507,3.501,4.718,3.924,3.65 c0,0,0.652-0.209,2.134,0.796C6.677,4.273,7.34,4.187,8,4.184c0.659,0.003,1.323,0.089,1.943,0.261 c1.482-1.004,2.132-0.796,2.132-0.796c0.423,1.068,0.157,1.857,0.077,2.054c0.497,0.542,0.798,1.235,0.798,2.082 c0,2.981-1.814,3.637-3.543,3.829c0.279,0.24,0.527,0.713,0.527,1.437c0,1.037-0.01,1.874-0.01,2.129 c0,0.208,0.14,0.449,0.534,0.373c3.081-1.028,5.302-3.935,5.302-7.362C15.76,3.906,12.285,0.431,7.999,0.431z"
              />
            </Icon>
          </Link>
        </Tooltip>
        <Tooltip label="Invitame un Cafecito" placement="top">
          <Link
            isExternal
            color={useColorModeValue("text", "textdark")}
            href="https://cafecito.app/alejorodriguez96"
          >
            <Icon boxSize={5} ml={2} viewBox="0 0 512 512">
              <path
                fill="currentColor"
                d="M127.1 146.5c1.3 7.7 8 13.5 16 13.5h16.5c9.8 0 17.6-8.5 16.3-18-3.8-28.2-16.4-54.2-36.6-74.7-14.4-14.7-23.6-33.3-26.4-53.5C111.8 5.9 105 0 96.8 0H80.4C70.6 0 63 8.5 64.1 18c3.9 31.9 18 61.3 40.6 84.4 12 12.2 19.7 27.5 22.4 44.1zm112 0c1.3 7.7 8 13.5 16 13.5h16.5c9.8 0 17.6-8.5 16.3-18-3.8-28.2-16.4-54.2-36.6-74.7-14.4-14.7-23.6-33.3-26.4-53.5C223.8 5.9 217 0 208.8 0h-16.4c-9.8 0-17.5 8.5-16.3 18 3.9 31.9 18 61.3 40.6 84.4 12 12.2 19.7 27.5 22.4 44.1zM400 192H32c-17.7 0-32 14.3-32 32v192c0 53 43 96 96 96h192c53 0 96-43 96-96h16c61.8 0 112-50.2 112-112s-50.2-112-112-112zm0 160h-16v-96h16c26.5 0 48 21.5 48 48s-21.5 48-48 48z"
              />
            </Icon>
          </Link>
        </Tooltip>
        <LightMode>
          <Box>
            <Tag
              mt={2}
              variant="subtle"
              cursor="pointer"
              bg="#e9eaeb"
              onClick={() => {
                toast.close(bugToast.current);
                return (bugToast.current = toast({
                  render: (props) => (
                    <Alert
                      borderRadius={6}
                      p={5}
                      mb="4em"
                      borderColor={
                        colorMode === "dark" ? "electivas.400" : "electivas.500"
                      }
                      borderWidth={2}
                      bg={colorMode === "dark" ? "gray.700" : "gray.50"}
                      color={colorMode === "dark" ? "textdark" : "text"}
                    >
                      <Box flex="1">
                        <AlertTitle>Hola!</AlertTitle>
                        <AlertDescription px={5} display="block">
                          <Text>
                            Estas son algunas aclaraciones sobre el uso de esta pagina:
                          </Text>
                          <UnorderedList>
                            <ListItem>
                              <Text>
                              Donde dice "Identificación" podes registrarte con algun número que te identifique como
                              estudiante o tu DNI. La base de datos es privada, pero si te preocupa la privacidad podes
                              registrarte con cualquier número. (Tené en cuenta que no se hace ningún tipo de validación,
                              si ponés "1234" seguramente cualquiera podrá ver tu avance en la carrera).
                              </Text>
                            </ListItem>
                            <ListItem>
                              <Text>
                              El botón de "Materias Electivas" te permite verlas de dos formas distintas: una con aquellas
                              electivas que podés cursar y otra con todas las materias aunque aún no puedas cursarlas.
                              </Text>
                            </ListItem>
                          </UnorderedList>
                          <Text>
                            Si querés que te responda, escribí tu
                            mail/telegram/algo.
                          </Text>
                          <Text fontSize="sm" mt={2}>
                            ¿Usás Github? me ayudás mucho más levantando un
                            issue{" "}
                            <Link
                              isExternal
                              _hover={{
                                color:
                                  colorMode === "dark"
                                    ? "electivas.400"
                                    : "electivas.500",
                              }}
                              href="https://github.com/FdelMazo/FIUBA-Map/issues/new"
                            >
                              directamente{" "}
                              <ExternalLinkIcon
                                color={
                                  colorMode === "dark"
                                    ? "electivas.400"
                                    : "electivas.500"
                                }
                                mx="2px"
                              />
                            </Link>
                          </Text>
                        </AlertDescription>
                      </Box>
                      <CloseButton
                        color={
                          colorMode === "dark"
                            ? "electivas.400"
                            : "electivas.500"
                        }
                        onClick={() => toast.close(props.id)}
                        position="absolute"
                        right="8px"
                        top="8px"
                      />
                    </Alert>
                  ),
                  status: "info",
                  position: "bottom",
                  duration: null,
                  isClosable: true,
                }));
              }}
            >
              <TagLabel>{"Como funciona?"}</TagLabel>
              <TagRightIcon as={InfoOutlineIcon} />
            </Tag>
          </Box>
        </LightMode>
      </Box>
    </Box>
  );
};

export default Body;
