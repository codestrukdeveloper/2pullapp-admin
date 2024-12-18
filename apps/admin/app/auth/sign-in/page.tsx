'use client';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
// Chakra imports
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
// Custom components
import { HSeparator } from 'components/separator/Separator';
import DefaultAuthLayout from 'layouts/auth/Default';
// Assets
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { RiEyeCloseLine } from 'react-icons/ri';
import { useAuthStore } from '../../admin/utils/authStore';

export default function SignIn() {
  const { login,token,isLoading, error } = useAuthStore();


  // Chakra color mode
  const textColor = useColorModeValue('navy.700', 'white');
  const textColorSecondary = 'gray.400';
  const textColorDetails = useColorModeValue('navy.700', 'secondaryGray.600');
  const textColorBrand = useColorModeValue('brand.500', 'white');
  const brandStars = useColorModeValue('brand.500', 'brand.400');
  const googleBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.200');
  const googleText = useColorModeValue('navy.700', 'white');
  const googleHover = useColorModeValue(
    { bg: 'gray.200' },
    { bg: 'whiteAlpha.300' },
  );
  const googleActive = useColorModeValue(
    { bg: 'secondaryGray.300' },
    { bg: 'whiteAlpha.200' },
  );

  // Form state
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = React.useState(false);
  const [formErrors, setFormErrors] = useState({ phoneNumber: '', password: '' });
  
  const handleClick = () => setShow(!show);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Explicitly define the type of errors to match your state
    let errors: { phoneNumber: string; password: string } = {
      phoneNumber: '',
      password: '',
    };
  
    // Validate phone number
    if (!phoneNumber) errors.phoneNumber = 'Phone number is required';
    
    // Validate password
    if (!password) errors.password = 'Password is required';
  
    // Update the state with errors
    setFormErrors(errors);
  
    // Check if all error values are empty strings
    const noErrors = Object.values(errors).every((error) => error === '');
  
    if (noErrors) {
      console.log(phoneNumber, password);
      // Call the login function from Zustand store with the redirect callback
      await login(phoneNumber, password, () => {
        // This callback will trigger the redirection
        router.push('/admin/default');
      });
    }
    
   
  };
  

  // Handle input change and clear errors
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
    if (formErrors.phoneNumber) setFormErrors({ ...formErrors, phoneNumber: '' });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (formErrors.password) setFormErrors({ ...formErrors, password: '' });
  };
  const router = useRouter();

  // Redirect to dashboard if token is set
  useEffect(() => {
      const token = localStorage.getItem('token'); // Get token from local storage
      if (token) {
        console.log(token);
        // Redirect to the dashboard if token exists
        router.push('/admin/default');
      }
  }, [router]);

  return (
    <DefaultAuthLayout illustrationBackground={'@/img/auth/auth.png'}>
      <Flex
        maxW={{ base: '100%', md: 'max-content' }}
        w="100%"
        mx={{ base: 'auto', lg: '0px' }}
        me="auto"
        h="100%"
        alignItems="start"
        justifyContent="center"
        mb={{ base: '30px', md: '60px' }}
        px={{ base: '25px', md: '0px' }}
        mt={{ base: '40px', md: '14vh' }}
        flexDirection="column"
      >
        <Box me="auto">
          <Heading color={textColor} fontSize="36px" mb="10px">
            Sign In
          </Heading>
          <Text
            mb="36px"
            ms="4px"
            color={textColorSecondary}
            fontWeight="400"
            fontSize="md"
          >
            Enter your phone number and password to sign in!
          </Text>
        </Box>



        <Flex
          zIndex="2"
          direction="column"
          w={{ base: '100%', md: '420px' }}
          maxW="100%"
          background="transparent"
          borderRadius="15px"
          mx={{ base: 'auto', lg: 'unset' }}
          me="auto"
          mb={{ base: '20px', md: 'auto' }}
        >
          <Button
            fontSize="sm"
            me="0px"
            mb="26px"
            py="15px"
            h="50px"
            borderRadius="16px"
            bgColor={googleBg}
            color={googleText}
            fontWeight="500"
            _hover={googleHover}
            _active={googleActive}
            _focus={googleActive}
          >
            <Icon as={FcGoogle} w="20px" h="20px" me="10px" />
            Sign in with Google
          </Button>
          <Flex align="center" mb="25px">
            <HSeparator />
            <Text color="gray.400" mx="14px">
              or
            </Text>
            <HSeparator />
          </Flex>

          {error && (
            <Text color="red.500" mb="20px" textAlign="center">
              {error}
            </Text>
          )}
          <FormControl>
            <FormLabel
              display="flex"
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              mb="8px"
            >
              Phone Number<Text color={brandStars}>*</Text>
            </FormLabel>
            <Input
              isRequired={true}
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              variant="auth"
              fontSize="sm"
              ms={{ base: '0px', md: '0px' }}
              type="text"
              placeholder="Enter your phone number"
              mb="24px"
              fontWeight="500"
              size="lg"
            />
            {formErrors.phoneNumber && (
              <Text color="red.500" fontSize="sm" mb="16px">
                {formErrors.phoneNumber}
              </Text>
            )}
            <FormLabel
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              display="flex"
            >
              Password<Text color={brandStars}>*</Text>
            </FormLabel>
            <InputGroup size="md">
              <Input
                isRequired={true}
                fontSize="sm"
                placeholder="Min. 8 characters"
                mb="24px"
                size="lg"
                value={password}
                onChange={handlePasswordChange}
                type={show ? 'text' : 'password'}
                variant="auth"
              />
              <InputRightElement display="flex" alignItems="center" mt="4px">
                <Icon
                  color={textColorSecondary}
                  _hover={{ cursor: 'pointer' }}
                  as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                  onClick={handleClick}
                />
              </InputRightElement>
            </InputGroup>
            {formErrors.password && (
              <Text color="red.500" fontSize="sm" mb="16px">
                {formErrors.password}
              </Text>
            )}
            <Flex justifyContent="space-between" align="center" mb="24px">
              <FormControl display="flex" alignItems="center">
                <Checkbox
                  id="remember-login"
                  colorScheme="brandScheme"
                  me="10px"
                />
                <FormLabel
                  htmlFor="remember-login"
                  mb="0"
                  fontWeight="normal"
                  color={textColor}
                  fontSize="sm"
                >
                  Keep me logged in
                </FormLabel>
              </FormControl>
              <Link href="/auth/forgot-password">
                <Text
                  color={textColorBrand}
                  fontSize="sm"
                  w="124px"
                  fontWeight="500"
                >
                  Forgot password?
                </Text>
              </Link>
            </Flex>
            <Button
              fontSize="sm"
              onClick={handleSignIn}
              variant="brand"
              fontWeight="500"
              w="100%"
              h="50"
              mb="24px"
            >
              Sign In
            </Button>
          </FormControl>
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="start"
            maxW="100%"
            mt="0px"
          >
            <Link href="/auth/sign-up">
              <Text color={textColorDetails} fontWeight="400" fontSize="14px">
                Not registered yet?
                <Text
                  color={textColorBrand}
                  as="span"
                  ms="5px"
                  fontWeight="500"
                >
                  Create an Account
                </Text>
              </Text>
            </Link>
          </Flex>
        </Flex>
      </Flex>
    </DefaultAuthLayout>
  );
}
