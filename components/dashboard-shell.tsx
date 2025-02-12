interface DashboardShellProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DashboardShell({ children, className, ...props }: DashboardShellProps) {
  return (
    <div className="grid items-start gap-8">
      <div className="flex flex-col space-y-6">
        <div className="container grid gap-6 px-4 py-6 md:px-6 lg:gap-10">
          {children}
        </div>
      </div>
    </div>
  )
}