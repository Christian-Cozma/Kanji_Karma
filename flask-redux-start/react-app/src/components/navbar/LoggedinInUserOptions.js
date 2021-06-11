import React from 'react'

import { useSelector, useDispatch } from "react-redux"
import { logout } from "../../store/session";

import { Button, Collapse, Stack,  Box, useDisclosure} from "@chakra-ui/react"
import { HamburgerIcon } from "@chakra-ui/icons"
import { Link, useHistory, useLocation } from "react-router-dom"

import { getCharsThatBelongToUser } from "../../store/users"
import { useParams } from "react-router-dom"

function LoggedinInUserOptions() {

    const user = useSelector(state => state.session.user)
    const { isOpen, onToggle } = useDisclosure()
    const dispatch = useDispatch()
    const history = useHistory()

    const location = useLocation()

    console.log(location.pathname);

    // const { id } = useParams()

    const onLogout = async (e) => {
        dispatch(logout());
        history.push("/")
      };

    //   const toggleInventory = () => {
    //       dispatch(getCharsThatBelongToUser(id))
    //       history.push(`/me/${id}/inventory`)
    //   }

    return (
        <>
            <Button onClick={onToggle} className="navbar dropdown or logout btn"><HamburgerIcon /></Button>
            <Collapse in={isOpen} animateOpacity>
                <Box
                display="block"
                p="40px"
                color="blackAlpha.800"
                mt="4"
                backgroundColor="blackAlpha.400"
                rounded="md"
                shadow="md"
                >
                    <Stack direction="column">
                        <Box>
                            {location.pathname === `/me/${user?.id}/inventory` ?
                           <Link to={`/me/${user?.id}/decks`}>
                           <Button w="150px">My Decks</Button>
                           </Link>
                            :
                             <Link to={`/me/${user?.id}/inventory`}>
                             <Button w="150px">My Inventory</Button>
                             </Link>
                            }
                        </Box>
                        <Box>
                            <Link to="/">
                            <Button w="150px" onClick={onLogout}>Logout</Button>
                            </Link>
                        </Box>
                        {/* <Box>
                            <Button w="150px" onClick={demoUserPageLoader}>Demo User Login</Button>
                        </Box> */}
                    </Stack>
                </Box>
            </Collapse>
    </>
    )
}

export default LoggedinInUserOptions
