import { Autocomplete, Group, rem, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons-react';
import classes from './SearchBar.module.css';
import { ReactNode } from 'react';

// example for the input
  // const [currentTab, setCurrentTab] = useState(0);
  // const tabs = ["Upcoming Events", "Past Events"];
  //   <Layout>
  //     <SearchInput selected={currentTab} tabs={tabs} setTab={setCurrentTab}/>
  //     <h1 className="underline">Home</h1>
  //   </Layout>
 

  interface SearchInputProps {
    tabs: string[];
    selected: number | null;
    setTab: ((index: number) => void) | null;
  }
  
  const SearchInput = ({ tabs, selected, setTab }: SearchInputProps): ReactNode => {
  const items = tabs?.map((tab, index) => (
    <Button
      className={classes.tabs}
      key={tab}
      // href={link.link}
      onClick={() => {setTab && setTab(index)}}
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
