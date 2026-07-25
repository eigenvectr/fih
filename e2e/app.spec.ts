import { test, expect } from "@playwright/test";

test("waters index links to the St. Lawrence page", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "fih" })).toBeVisible();
  await page.getByRole("link", { name: /St\. Lawrence River/ }).click();
  await expect(
    page.getByRole("heading", { name: "St. Lawrence River" }),
  ).toBeVisible();
  await expect(page.getByText("Spots · nearest first")).toBeVisible();
  await expect(page.getByRole("button", { name: /Tibbetts Point/ })).toBeVisible();
});

test("species filter narrows the spot list", async ({ page }) => {
  await page.goto("/water/st-lawrence-river");
  const spotList = page.getByRole("list", { name: "Spots" });
  await expect(spotList.getByText("Goose Bay", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Muskie", exact: true }).click();
  await expect(spotList.getByText(/Forty Acre Shoal/)).toBeVisible();
  await expect(spotList.getByText("Goose Bay", { exact: true })).toHaveCount(0);
});

test("spot card expands with seasons, baits and sources", async ({ page }) => {
  await page.goto("/water/st-lawrence-river");
  const row = page
    .getByRole("list", { name: "Spots" })
    .locator("li")
    .filter({ hasText: "Clayton drifts" });
  await row.getByRole("button", { name: /Clayton drifts/ }).click();
  await expect(row.getByText("Season by season")).toBeVisible();
  await expect(row.getByText("Baits & presentations")).toBeVisible();
  await expect(row.getByRole("link", { name: /Log a catch here/ })).toBeVisible();
});

test("run plan collects checked spots", async ({ page }) => {
  await page.goto("/water/st-lawrence-river");
  await page.getByLabel(/Add .* to run plan/).first().check();
  await expect(page.getByText("Today's run")).toBeVisible();
  await page.reload();
  await expect(page.getByText("Today's run")).toBeVisible();
});

test("log entry saves, survives reload, and exports valid JSON", async ({
  page,
}) => {
  await page.goto("/log");
  await page.getByRole("button", { name: "New catch" }).click();
  await page.getByRole("button", { name: "Smallmouth", exact: true }).click();
  await page.getByPlaceholder("18.5").fill("19.5");
  await page.getByPlaceholder("Drop-shot goby").fill("Ned rig");
  await page.getByRole("button", { name: "Save catch" }).click();
  await expect(page.getByText("1 catches · stored on this device")).toBeVisible();
  await expect(page.getByText("Ned rig", { exact: false })).toBeVisible();

  await page.reload();
  await expect(page.getByText("1 catches · stored on this device")).toBeVisible();

  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Export log as JSON" }).click();
  const download = await downloadPromise;
  const path = await download.path();
  const { readFileSync } = await import("fs");
  const parsed = JSON.parse(readFileSync(path!, "utf8"));
  expect(parsed.app).toBe("fih");
  expect(parsed.entries).toHaveLength(1);
  expect(parsed.entries[0].species).toBe("smallmouth");
  expect(parsed.entries[0].lengthIn).toBe(19.5);
});

test("log-a-catch deep link prefills water and spot", async ({ page }) => {
  await page.goto("/log?water=st-lawrence-river&spot=clayton-drifts&new=1");
  await expect(page.getByRole("heading", { name: "New catch" })).toBeVisible();
  await expect(page.locator("select").nth(1)).toHaveValue("clayton-drifts");
});
