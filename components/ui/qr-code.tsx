"use client"

import { QRCodeSVG } from "qrcode.react"

interface QRCodeProps {
  value: string
  size?: number
  className?: string
}

export function QRCode({ value, size = 96, className }: QRCodeProps) {
  return (
    <div className={className}>
      <QRCodeSVG
        value={value}
        size={size}
        level="L"
        includeMargin={true}
        className="h-full w-full"
      />
    </div>
  )
} 