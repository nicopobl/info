import {
  AppBar,
  Box,
  Container,
  Input,
  Typography,
  useTheme,
} from "@mui/material";
import { ReactNode, useState } from "react";
import BasicMenu from "./menu";
import Link from "next/link";
import { useRouter } from "next/router";

const LINKS = [
  {
    label: "Overview",
    href: "/",
  },
  {
    label: "Pools",
    href: "/pools",
  },
  {
    label: "Tokens",
    href: "/tokens",
  },
];

export default function Layout({ children }: { children: ReactNode }) {
  const theme = useTheme();
  const router = useRouter();
  const currentPath = router.pathname;

  const isActive = (href: string) => {
    if (href === "/") return currentPath === href;
    return currentPath.includes(href);
  };

  return (
    <main>
      <AppBar position="fixed">
        <Box
          bgcolor="black"
          px={2}
          py={1}
          display="flex"
          justifyContent="space-between"
        >
          <Box display="flex" gap="16px">
            <Box
              display="flex"
              alignItems="center"
              gap="2px"
              bgcolor="lightgray"
              color="black"
              px="8px"
              borderRadius="4px"
            >
              <Typography fontSize={12}>Latest synced block:</Typography>
              <Typography fontSize={12} color="green">
                12345678
              </Typography>
              <Box
                bgcolor="green"
                width="8px"
                height="8px"
                borderRadius="100%"
                marginLeft="2px"
              />
            </Box>
            <Box display="flex" alignItems="center" gap="2px">
              <Typography fontSize={12}>Eth Price:</Typography>
              <Typography fontSize={12}>$2.6k</Typography>
            </Box>
          </Box>
          <Box display="flex" gap="16px">
            <Typography fontSize={12}>V2 Analytics</Typography>
            <Typography fontSize={12}>Docs</Typography>
            <Typography fontSize={12}>App</Typography>
          </Box>
        </Box>

        <Box display="flex" justifyContent="space-between" p={2}>
          <Box display="flex" gap="12px" alignItems="center">
            <Box
              component="img"
              src="/logo-dark.svg"
              width="82px"
              height="40px"
              marginRight="12px"
            />
            {LINKS.map((link, idx) => (
              <Link href={link.href} key={link.label}>
                <Typography
                  sx={{
                    cursor: "pointer",
                    bgcolor: isActive(link.href) ? "lightgray" : "",
                    color: isActive(link.href) ? "black" : "",
                    padding: "4px 12px",
                    borderRadius: "6px",
                  }}
                >
                  {link.label}
                </Typography>
              </Link>
            ))}
          </Box>
          <Box display="flex" gap="12px" flexGrow="1" justifyContent="flex-end">
            <Input
              placeholder="Search pools or tokens"
              sx={{
                bgcolor: "white",
                borderRadius: 5,
                px: 2,
                width: "100%",
                maxWidth: "400px",
              }}
            />
            <BasicMenu />
          </Box>
        </Box>
      </AppBar>
      <Box mt="100px" p={4} bgcolor={theme.palette.background.default}>
        <Container maxWidth="lg">{children}</Container>
      </Box>
    </main>
  );
}
