import { TabPanel, type TabPanelProps } from "@mui/joy";


export const HorizontalScrollTabPanel = (props: TabPanelProps) => {
  const {sx=[], children} = props;

  return <TabPanel {...props} sx={[
    {
      width: 1,
      overflowY: "hidden",
      overflowX: "auto",
      whiteSpace: "nowrap",
      "&::-webkit-scrollbar": {
        display: "none",
      },
      "&": {
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      },
    },
    ...(Array.isArray(sx) ? sx: [sx])
  ]
  }>{children}</TabPanel>; 
}