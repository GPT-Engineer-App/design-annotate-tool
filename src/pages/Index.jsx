import React, { useState } from "react";
import { Container, Box, Text, VStack, IconButton, Tooltip, useToast, HStack, Button, Input, Textarea } from "@chakra-ui/react";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import { Rnd } from "react-rnd";

const sampleContent = `
  <h1>Sample Web Page</h1>
  <p>This is a sample paragraph to demonstrate the annotation tool.</p>
  <button>Sample Button</button>
`;

const AnnotationTool = () => {
  const [annotations, setAnnotations] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newAnnotation, setNewAnnotation] = useState({ title: "", description: "" });
  const toast = useToast();

  const handleAddAnnotation = (e) => {
    if (isAdding) {
      const newAnno = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
        title: newAnnotation.title,
        description: newAnnotation.description,
      };
      setAnnotations([...annotations, newAnno]);
      setIsAdding(false);
      setNewAnnotation({ title: "", description: "" });
      toast({
        title: "Annotation added.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleDeleteAnnotation = (id) => {
    setAnnotations(annotations.filter((anno) => anno.id !== id));
    toast({
      title: "Annotation deleted.",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Container maxW="container.xl" p={4}>
      <HStack spacing={4} mb={4}>
        <Button leftIcon={<FaPlus />} colorScheme="teal" onClick={() => setIsAdding(true)}>
          Add Annotation
        </Button>
        <Button leftIcon={<FaTrash />} colorScheme="red" onClick={() => setAnnotations([])}>
          Clear Annotations
        </Button>
      </HStack>
      <Box border="1px" borderColor="gray.200" p={4} onClick={handleAddAnnotation} dangerouslySetInnerHTML={{ __html: sampleContent }} />
      {annotations.map((anno) => (
        <Rnd key={anno.id} default={{ x: anno.x, y: anno.y, width: 200, height: 100 }}>
          <Box position="absolute" top={0} left={0} p={2} bg="white" border="1px" borderColor="gray.200" borderRadius="md" shadow="md">
            <HStack justifyContent="space-between">
              <Text fontWeight="bold">{anno.title}</Text>
              <IconButton icon={<FaTrash />} size="sm" onClick={() => handleDeleteAnnotation(anno.id)} />
            </HStack>
            <Text>{anno.description}</Text>
          </Box>
        </Rnd>
      ))}
      {isAdding && (
        <Box position="fixed" bottom={4} left="50%" transform="translateX(-50%)" p={4} bg="white" border="1px" borderColor="gray.200" borderRadius="md" shadow="md">
          <VStack spacing={2}>
            <Input placeholder="Title" value={newAnnotation.title} onChange={(e) => setNewAnnotation({ ...newAnnotation, title: e.target.value })} />
            <Textarea placeholder="Description" value={newAnnotation.description} onChange={(e) => setNewAnnotation({ ...newAnnotation, description: e.target.value })} />
            <Button colorScheme="teal" onClick={() => setIsAdding(false)}>
              Cancel
            </Button>
          </VStack>
        </Box>
      )}
    </Container>
  );
};

const Index = () => {
  return (
    <Container centerContent maxW="container.xl" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <AnnotationTool />
    </Container>
  );
};

export default Index;
