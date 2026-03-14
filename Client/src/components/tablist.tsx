import { TabList, type TabListProps, tabClasses } from "@mui/joy"

const CustomTabList = (props: TabListProps) => {
  const {children, sx} = props;
  return <TabList
  disableUnderline
  {...props}
  sx={[{
    p: 0.5,
    gap: 0.5,
    borderRadius: 'xl',
    bgcolor: 'background.level1',
    [`& .${tabClasses.root}[aria-selected="true"]`]: {
      boxShadow: 'sm',
      bgcolor: 'background.surface',
    },
  },
    ...Array.isArray(sx) ? sx: [sx]
  ]}
>
  {children}
  </TabList>
}

export default CustomTabList