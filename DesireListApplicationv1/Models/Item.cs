using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DesireListApplicationv1.Models
{
    public class Item
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool Checked { get; set; }
        public int ListId { get; set; }

        public Item()
        {
            Id = 0;
            Name = string.Empty;
            Checked = false;
            ListId = 1;
        }
    }
}