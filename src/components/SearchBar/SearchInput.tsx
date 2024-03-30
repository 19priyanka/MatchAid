import { Autocomplete, Group, rem, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons-react';
import classes from './SearchBar.module.css';
import PropTypes from 'prop-types';

// example for the input
  // const num = 0; this is the index of the tab that is currently in use or navigating to
  // const tabs = ["Upcoming Events", "Past Events"];
  //   <Layout>
  //     <SearchInput selected={num} tabs={tabs}/>
  //     <h1 className="underline">Home</h1>
  //   </Layout>

const SearchInput= ( {tabs, selected=0}) => {


  const items = tabs?.map((tab, index) => (
    <Button
      className={classes.tabs}
      key={tab}
      // href={link.link}
      onClick={(event) => event.preventDefault()}
      color= {(index==selected)? ('black'): ('grey')}
      variant= {(index==selected)? ('filled'): ('light')}
      radius={16}
      style={{height: 45}}
    >
      {tab}
    </Button>
  ));

  return (
      <Group style={{ marginBottom: 40}}>
        <Autocomplete
          className={classes.search}
          placeholder="Search..."
          leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
          data={['React', 'Angular', 'Vue', 'Next.js', 'Riot.js', 'Svelte', 'Blitz.js']}
          visibleFrom="xs"
          radius = {30}
          variant = "filled"
          // style = {{margin: 25}}
        />
        <Group className={classes.tabBar} style={{overflow: 'clip'}}>
          {items}
        </Group>
      </Group>
  )};
  export default SearchInput;
