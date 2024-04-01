import Layout from "../components/shared/layout"
import SearchInput from "../components/SearchBar/SearchInput"
import { Popover, Card, Image, Text, Badge, Button, Group } from '@mantine/core';

export default function homePage(){
    return (
    <Layout>
        <SearchInput tabs={[]}/>
    </Layout>
    )
}