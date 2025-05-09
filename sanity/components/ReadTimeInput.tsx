import {TextInput, Flex, Text, Box} from '@sanity/ui'
import {useMemo} from 'react'
import {ObjectInputProps, set, unset} from 'sanity'
import {useFormValue} from 'sanity'

interface ReadTimeValue {
  minutes?: number
  autoCalculate?: boolean
}

// Helper to extract all text from portable text blocks
const getBlockText = (blocks: any[] = []): string => {
  return blocks
    .map((block) => {
      if (block._type !== 'block' || !block.children) return ''
      return block.children.map((child: any) => child.text || '').join(' ')
    })
    .join(' ')
}

export default function ReadTimeInput(props: ObjectInputProps<ReadTimeValue>) {
  const {value = {}, onChange} = props
  const body = useFormValue(['body']) as any[]

  // Calculate word count PROPERLY
  const wordCount = useMemo(() => {
    return body
      ? getBlockText(body)
          .split(/\s+/)
          .filter((word) => word.length > 0).length
      : 0
  }, [body])

  const calculatedMinutes = Math.max(1, Math.round(wordCount / 250))

  const handleChange = (update: Partial<ReadTimeValue>) => {
    if (update.minutes === undefined && update.autoCalculate === undefined) {
      onChange(unset())
    } else {
      onChange(
        set({
          ...value,
          ...update,
        }),
      )
    }
  }

  return (
    <Flex direction="column" gap={3}>
      {value.autoCalculate ? (
        <Text size={1} muted>
          Auto-calculated: {calculatedMinutes} min ({wordCount} words)
        </Text>
      ) : (
        <TextInput
          type="number"
          value={value.minutes || calculatedMinutes}
          onChange={(e) =>
            handleChange({
              minutes: parseInt(e.currentTarget.value),
              autoCalculate: value.autoCalculate,
            })
          }
        />
      )}
      <Box>
        <label>
          <input
            type="checkbox"
            checked={value.autoCalculate !== false}
            onChange={(e) =>
              handleChange({
                autoCalculate: e.target.checked,
                minutes: e.target.checked ? calculatedMinutes : value.minutes,
              })
            }
          />
          Auto-calculate from content
        </label>
      </Box>
    </Flex>
  )
}
