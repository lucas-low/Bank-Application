import { UnstyledButton, Group, Text, Center, createStyles} from "@mantine/core";
import { IconSelector, IconChevronDown, IconChevronUp } from '@tabler/icons';
import {ThProps} from "../../types";

// styles for table headers
  const useStyles = createStyles((theme) => ({
    th: {
      padding: '0 !important', 
    },
  
    control: {
      width: '100%',
      padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
      display: 'flex',
      alignItems: 'center',
  
      '&:hover': {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
      },
    },
  
    icon: {
      width: 21,
      height: 21,
      borderRadius: 21,
    },
  }));
  
// sorting table headers ascending and descending
function TableHead ({ children, reversed, sorted, onSort }: ThProps) {
    const { classes } = useStyles();
    const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;
    return (
      <th className={classes.th}>
        <UnstyledButton onClick={onSort} className={classes.control}>
            <Text weight={500} size="sm">
              {children}
            </Text>
            <Center className={classes.icon}>
              <Icon size={14} stroke={1.5} />
            </Center>
        </UnstyledButton>
      </th>
    );
  }

  export default TableHead