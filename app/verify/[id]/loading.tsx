import { Card } from "@/components/ui/card"

export default function VerifyLoading() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <Card className="max-w-md mx-auto overflow-hidden bg-white shadow-lg">
          <div className="flex flex-col items-center justify-center p-8 h-96">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#026FB4]"></div>
            <p className="mt-4 text-lg text-gray-600">Verifying delegate...</p>
          </div>
        </Card>
      </div>
    </div>
  )
}
