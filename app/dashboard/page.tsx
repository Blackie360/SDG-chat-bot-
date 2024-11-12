"use client"

import { ArrowRight, ArrowUpRight, ChevronDown, ChevronRight, CreditCard, Link2, Search, Settings, Users } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Component() {
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-gray-100/40 lg:block">
        <div className="flex h-full flex-col gap-2">
          <div className="flex h-[60px] items-center border-b px-6">
            <Link2 className="mr-2 h-6 w-6" />
            <span className="font-semibold">Hauz</span>
          </div>
          <div className="flex-1 px-4">
            <div className="space-y-4 py-4">
              <div className="px-3 py-2">
                <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Dashboards</h2>
                <div className="space-y-1">
                  <Button variant="secondary" className="w-full justify-start">
                    <Users className="mr-2 h-4 w-4" />
                    Overview
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Users className="mr-2 h-4 w-4" />
                    Users & Customers
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Wallets & Transactions
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Dashboards</span>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Default</span>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Search className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <Button variant="ghost" size="icon">
              <Image
                src="/placeholder.svg?height=32&width=32"
                alt="Avatar"
                className="rounded-full"
                height={32}
                width={32}
              />
            </Button>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold">Dashboard</h1>
              <p className="text-sm text-muted-foreground">Central Hub for Your Hauz</p>
            </div>
            <Button variant="outline">View Profile</Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Transactions In Value</CardTitle>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">9.3k</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Transactions Out Value</CardTitle>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24k</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Transactions Count</CardTitle>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">608</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Transactions Value</CardTitle>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.5k</div>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Transaction Value</CardTitle>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <div className="h-3 w-3 rounded-full bg-primary" />
                      <span className="text-sm text-muted-foreground">Profit Only</span>
                    </div>
                    <Button variant="outline" size="sm">
                      12 months
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] w-full">
                  {/* Replace with actual chart component */}
                  <div className="h-full w-full rounded-lg bg-gradient-to-r from-primary/20 to-primary/5" />
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Spread the word and earn</CardTitle>
                <p className="text-sm text-muted-foreground">Discounts on your Bulk Transactions</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  When You refer Hauz to a new Business User, you can get up to 25% off all transaction charges on Bulk
                  Transactions
                </p>
                <Button className="mt-4" variant="outline">
                  Get your Link
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Pending Transaction</CardTitle>
                <p className="text-sm text-muted-foreground">Due by 09:30PM, Today</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid gap-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Image
                          src="/placeholder.svg?height=32&width=32"
                          alt="Avatar"
                          className="rounded-full"
                          height={32}
                          width={32}
                        />
                        <div>
                          <p className="text-sm font-medium leading-none">Hi Paul,</p>
                          <p className="text-sm text-muted-foreground">
                            Please action this for tomorrow&apos;s Material purchase and Transport
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle>Wallets</CardTitle>
                <Input className="w-[150px]" placeholder="Search Wallets" />
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium leading-none">Cool Wallet</p>
                        <p className="text-sm text-muted-foreground">Should be a Cool Wallet&apos;s Desc</p>
                      </div>
                      <p className="text-sm text-muted-foreground">21 Oct, 2024</p>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium leading-none">B & N Building Constru.</p>
                        <p className="text-sm text-muted-foreground">We can build this</p>
                      </div>
                      <p className="text-sm text-muted-foreground">15 Oct, 2024</p>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium leading-none">HR Department</p>
                        <p className="text-sm text-muted-foreground">Talent acquisition, employee welfare</p>
                      </div>
                      <p className="text-sm text-muted-foreground">10 Oct, 2024</p>
                    </div>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}